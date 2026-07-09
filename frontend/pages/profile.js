'use client' 

import { useEffect, useState, useCallback } from 'react'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseAbi } from 'viem'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

// Community Membership SBT
const COMMUNITY_MEMBER_TYPE = 1


function shortenAddress(address) {
  if (!address) return ''
  return `${address.slice(0,6)}...${address.slice(-4)}`
}

export default function Profile() {


  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  const [cards,setCards] = useState([])
  const [membership,setMembership] = useState(null)

  const [loading,setLoading] = useState(true)
  const [claiming,setClaiming] = useState(false)
   
  const [email, setEmail] = useState('')
  const [updatingWallet, setUpdatingWallet] = useState(false)


  const fetchData = useCallback(async()=>{

      if(!address || !publicClient){

          setCards([])
          setMembership(null)
          setLoading(false)

          return

      }

      setLoading(true)

      //------------------------------------
      // Read credentials from Polygon
      //------------------------------------

      try{

          const abi=parseAbi([
              'function tokensOfOwner(address) view returns(uint256[])',
              'function tokenURI(uint256) view returns(string)'
          ])

          const tokenIds=await publicClient.readContract({

              address:CONTRACT_ADDRESS,
              abi,
              functionName:'tokensOfOwner',
              args:[address]

          })

          const owned=[]

          for(const tokenId of tokenIds){

              try{

                  const uri=await publicClient.readContract({

                      address:CONTRACT_ADDRESS,
                      abi,
                      functionName:'tokenURI',
                      args:[tokenId]

                  })

                  const res=await fetch(uri)

                  const metadata=await res.json()

                  owned.push({

                      tokenId:Number(tokenId),
                      metadata

                  })

              }catch(err){

                  console.error(err)

              }

          }

          setCards(owned)

      }catch(err){

          console.error(err)

      }

      //------------------------------------
      // Membership approval status
      //------------------------------------

      try{

          const res=await fetch(

              `/api/membership/status?wallet=${address}`

          )

          const json=await res.json()

          setMembership(json)

      }

      catch(err){

          console.error(err)

      }

      setLoading(false)

  },[address,publicClient])

  useEffect(()=>{

      fetchData()

  },[fetchData])



async function handleWalletUpdate() {

    if (!email) {

        alert('Please enter your email.')

        return

    }

    try {

        setUpdatingWallet(true)

        const res = await fetch('/api/membership/update-wallet', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                email,
                wallet: address

            })

        })

        const json = await res.json()

        if (!res.ok) {

            alert(json.error || 'Unable to update wallet.')

            return

        }

     alert('Your wallet has been linked to your approved membership. You can now claim your Community Membership.')

        await fetchData()

    }

    finally {

        setUpdatingWallet(false)

    }

}

  //------------------------------------
  // Claim Community Membership
  //------------------------------------


  async function handleClaim(){

      try{

          setClaiming(true)

          await writeContractAsync({

              address:CONTRACT_ADDRESS,

              abi:parseAbi([

                  'function claim(uint256)'

              ]),

              functionName:'claim',

              args:[COMMUNITY_MEMBER_TYPE]

          })

          await fetch('/api/membership/claimed',{

              method:'POST',

              headers:{

                  'Content-Type':'application/json'

              },

              body:JSON.stringify({

                  wallet:address

              })

          })

          await fetchData()

      }

      catch(err){

          console.error(err)

      }

      finally{

          setClaiming(false)

      }

  }

  return(

<div className="min-h-screen bg-zinc-950 text-white">

<div className="max-w-4xl mx-auto px-6 py-16">

<h1 className="text-4xl font-bold">

My Credentials

</h1>

<p className="text-zinc-400 mt-2">

Official EDGE Spaces digital credentials.

</p>

{!address && (

<div className="mt-20 bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">

<h2 className="text-2xl font-semibold mb-4">

Connect Your Wallet

</h2>

<p className="text-zinc-400 mb-4">

Connect your Polygon-compatible wallet to access your EDGE Spaces credentials.

</p>

<div className="flex justify-center mb-8">

<ConnectButton />

</div>

<div className="border-t border-zinc-800 pt-8">

<h3 className="text-xl font-semibold">

New to EDGE Spaces?

</h3>

<p className="text-zinc-400 mt-2">

If you have not yet applied for membership, please submit your membership application first.

</p>

<a
    href="/#apply"
    className="inline-block mt-4 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
>

Apply for Membership

</a>

</div>

<div className="border-t border-zinc-800 pt-8 mt-8">

<h3 className="text-xl font-semibold">

Already an approved member?

</h3>

<p className="text-zinc-400 mt-2">

If you joined without providing a wallet, connect your Polygon-compatible wallet above. You will then be able to link your wallet to your approved membership and claim your Community Membership credential.

</p>

</div>

</div>
)}

{address && (

<>

<div className="mt-10 mb-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

<div className="text-xl font-semibold">

Connected Wallet

</div>

<div className="text-zinc-400 mt-2">

Verified wallet

</div>

<div className="font-mono text-sm mt-1 break-all">

{shortenAddress(address)}

</div>

</div>

{loading && (

<div className="text-center py-16 text-zinc-400">

Checking your community membership...

</div>

)}

{!loading && cards.length > 0 && (

<>

<div className="mb-8">

<h2 className="text-2xl font-semibold">

Your Credentials

</h2>

<p className="text-zinc-400 mt-2">

This wallet owns the following verified EDGE Spaces credentials.

</p>

</div>

<div className="space-y-8">

{cards.map(card => (

<div
key={card.tokenId}
className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
>

{card.metadata.image && (

<img
src={card.metadata.image}
alt={card.metadata.name}
className="w-full"
/>

)}

<div className="p-8">

<h2 className="text-2xl font-semibold">

{card.metadata.name}

</h2>

<p className="text-zinc-400 mt-3">

{card.metadata.description}

</p>

<div className="mt-8 space-y-4">

{card.metadata.attributes?.map((attr,index)=>(

<div
key={index}
className="flex justify-between border-b border-zinc-800 pb-3"
>

<span className="text-zinc-500">

{attr.trait_type}

</span>

<span className="font-medium text-right">

{attr.value}

</span>

</div>

))}

</div>


                    </div>

                  </div>

                ))}

              </div>

            </>

          )}

          {/* Approved - Ready to Claim */}

          {!loading &&
            cards.length === 0 &&
            membership?.status === 'approved' && (

              <div className="bg-zinc-900 border border-green-700 rounded-xl p-10">

                <h2 className="text-2xl font-semibold">

                  Community Membership Approved

                </h2>

                <p className="text-zinc-400 mt-4">

                  Your membership application has been approved.

                </p>

<p className="text-zinc-400 mt-2">

  Click below to mint your official EDGE Spaces
  Community Membership credential to this wallet.

</p>

<div className="mt-8 flex justify-center">

  <img
    src="/data/example-membership-card.jpg"
    alt="EDGE Spaces Community Membership"
    className="w-full max-w-sm rounded-2xl border border-zinc-800 shadow-lg"
  />

</div>

<p className="text-center text-zinc-500 mt-6 max-w-lg mx-auto">

  Your Digital Membership is a permanent blockchain credential issued on
  Polygon Mainnet. After claiming, it will appear on your Profile and can
  also be viewed in compatible wallets and NFT marketplaces.

</p>

<button

  onClick={handleClaim}

  disabled={claiming}

  className="mt-8 w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"

>

  {claiming
    ? 'Claiming Membership...'
    : 'Claim Community Membership'}

</button>
              </div>

          )}

          {/* Pending Approval */}

          {!loading &&
            cards.length === 0 &&
            membership?.status === 'pending' && (

              <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-10">

                <h2 className="text-2xl font-semibold">

                  Membership Application Received

                </h2>

                <p className="text-zinc-400 mt-4">

                  Thank you for applying to join EDGE Spaces.

                </p>

                <p className="text-zinc-400 mt-2">

                  Your application is currently under review.

                </p>

                <p className="text-zinc-400 mt-2">

                  Once approved, the Community Membership claim
                  button will automatically appear on this page.

                </p>

              </div>

          )}

{/* No Application */}

{!loading &&
  cards.length === 0 &&
  membership?.status === 'none' && (

<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10">

<h2 className="text-2xl font-semibold">

Join EDGE Spaces

</h2>

<p className="text-zinc-400 mt-4">

This wallet is not currently associated with a membership application.

</p>

<a
    href="/#apply"
    className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
>

Apply for Membership

</a>

<div className="mt-10 border-t border-zinc-800 pt-8">

<h3 className="text-xl font-semibold">

Already an approved member?

</h3>

<p className="text-zinc-400 mt-2">

If you previously joined without providing a wallet, enter your membership email below.

If your email matches an approved membership, this wallet will be linked to your account so you can claim your Community Membership credential.

</p>

<input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="mt-4 w-full rounded border border-zinc-700 bg-zinc-800 p-3 text-white"
/>

<button
    onClick={handleWalletUpdate}
    disabled={updatingWallet}
    className="mt-4 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
>

{updatingWallet
    ? 'Updating Wallet...'
    : 'Register This Wallet'}

</button>

</div>

</div>

)}
        </>

      )}

    </div>

</div>

  )

}

