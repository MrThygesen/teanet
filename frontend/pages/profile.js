'use client' 

import { useEffect, useState, useCallback } from 'react'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseAbi } from 'viem'
import { polygon } from 'wagmi/chains'


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
  const [loading,setLoading] = useState(true)
  const [claiming,setClaiming] = useState(false)
   
  const [email, setEmail] = useState('')
  const [updatingWallet, setUpdatingWallet] = useState(false)
  const [membership, setMembership] = useState(null)

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

console.log("Wallet:", address)
console.log("Contract:", CONTRACT_ADDRESS)

const tokenIds = await publicClient.readContract({

    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'tokensOfOwner',
    args: [address]

})

console.log("Token IDs:", tokenIds)
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

               const metadata = await res.json()

console.log("URI:", uri)
console.log("Metadata:", metadata)

owned.push({
                      tokenId:Number(tokenId),
                      metadata

                  })

              }catch(err){

                  console.error(err)

              }

          }

console.log("Owned:", owned)
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

      console.log("🚀 Claim button clicked")
      console.log("Wallet:", address)
      console.log("Contract:", CONTRACT_ADDRESS)

      try{

        setClaiming(true)

console.log("⏳ Calling writeContractAsync...")

const hash = await writeContractAsync({

    chainId: polygon.id,

    address: CONTRACT_ADDRESS,

    abi: parseAbi([
        'function claim(uint256)'
    ]),

    functionName:'claim',

    args:[COMMUNITY_MEMBER_TYPE]

}) 

console.log("✅ Transaction submitted:", hash)

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

    console.error("❌ Claim failed")
    console.error(err)
    console.error("message:", err?.message)
    console.error("shortMessage:", err?.shortMessage)
    console.error("cause:", err?.cause)
    console.error("full:", JSON.stringify(err, null, 2))

}

      finally{

          setClaiming(false)

      }

  }

  return(

<div className="min-h-screen bg-zinc-950 text-white">

<div className="max-w-4xl mx-auto px-6 py-16">

<h1 className="text-4xl font-bold">

My Membership

</h1>

<p className="text-zinc-400 mt-2">

Your Digital Membership and community information.

</p>

{!address && (

<div className="mt-20 bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">

<h2 className="text-2xl font-semibold mb-4">

Connect Your Wallet

</h2>

<p className="text-zinc-400 mb-4">

Connect your Polygon-compatible wallet to access your Digital Membership.

</p>
<div className="flex justify-center mb-8">

    <ConnectButton />

</div>

<div className="text-center mb-8">

    <p className="text-zinc-500 text-sm mb-5">
 Need help connecting your wallet?
</p>

<a
    href="/wallet-setup"
    className="inline-flex items-center justify-center
               px-5 py-3
               rounded-lg
               border border-zinc-700
               hover:border-blue-500
               hover:bg-zinc-800
               transition"
>
    Wallet Connection Help
</a>
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

Update Your Wallet Information

</h3>

<p className="text-zinc-400 mt-2">

 If you applied without providing a wallet, enter the email address you used for your membership application below. Your connected wallet must be Polygon-compatible. We'll link it to your approved membership so you can claim your Digital Membership.

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

  <div className="font-mono text-sm mt-1 break-all">
    {shortenAddress(address)}
  </div>

</div>

<div className="mb-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

  <h2 className="text-xl font-semibold mb-6">
    Membership Information
  </h2>

  {loading ? (

  <p className="text-zinc-500">
    Loading membership...
  </p>

) : membership?.status === 'none' ? (

  <p className="text-zinc-500">
    No membership found.
  </p>

  ) : (

    <div className="space-y-4">

      <ProfileRow
        label="Status"
value={
  membership?.claimed
    ? 'Claimed'
    : membership?.status
      ? membership?.status.charAt(0).toUpperCase() +
        membership?.status.slice(1)
      : '-'
}
      />

      <ProfileRow
        label="Name"
value={membership?.full_name}
      />



      <ProfileRow
        label="Company"
value={membership?.company}      />

      <ProfileRow
        label="Membership"
        value={membership?.membership_type}
      />

      <ProfileRow
        label="Telegram"
        value={membership?.telegram_username}
      />

      <ProfileRow
        label="LinkedIn"
        value={membership?.linkedin_url}
      />

      <ProfileRow
        label="Approved"
        value={
          membership?.approved_at
            ? new Date(
                membership.approved_at
              ).toLocaleDateString()
            : '-'
        }
      />

<ProfileRow
    label="Claimed"
    value={
        membership?.claimed_at
            ? new Date(membership.claimed_at).toLocaleDateString()
            : '-'
    }
/>
     </div>

  )}

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

Your Digital Membership

</h2>

<p className="text-zinc-400 mt-2">

This wallet contains your Digital Membership and any future member collections.

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
membership?.status === 'approved' &&
!membership?.claimed && (

              <div className="bg-zinc-900 border border-green-700 rounded-xl p-10">

                <h2 className="text-2xl font-semibold">

                  Community Membership Approved

                </h2>

                <p className="text-zinc-400 mt-4">

                  Welcome to the EDGE Spaces Community.
Your membership application has been approved.

                </p>

<p className="text-zinc-400 mt-2">

Click below to issue your official EDGE Spaces
Digital Membership to this wallet.

</p>

<div className="mt-8 flex justify-center">

  <img
    src="/data/example-membership-card.jpg"
    alt="EDGE Spaces Community Membership"
    className="w-full max-w-sm rounded-2xl border border-zinc-800 shadow-lg"
  />

</div>

<p className="text-zinc-400 mt-2">

We're synchronizing your Digital Membership.

If your Digital Membership doesn't appear after refreshing the page,
please try again in a few moments.

</p>


<div
    onClick={() => {
        alert("DIV CLICK")
        console.log("DIV CLICK")
    }}
    style={{
        background: "red",
        padding: "20px",
        position: "relative",
        zIndex: 9999
    }}
>

<button

  onClick={() => {
      alert("BUTTON CLICK")
      console.log("BUTTON CLICK")
      handleClaim()
  }}

  disabled={claiming}

  style={{
      position: "relative",
      zIndex: 9999
  }}

  className="mt-8 w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"

>

</div>

  {claiming
    ? 'Claiming Membership...'
    : 'Claim Community Membership'}

</button>
              </div>

          )}

{/* Already Claimed */}

{!loading &&
  cards.length === 0 &&
  membership?.claimed && (

<div className="bg-zinc-900 border border-blue-700 rounded-xl p-10">

<h2 className="text-2xl font-semibold">

Community Membership Claimed

</h2>

<p className="text-zinc-400 mt-4">

Your Community Membership has already been claimed.

</p>

<p className="text-zinc-400 mt-2">

Community Membership Claimed

Your Community Membership has already been claimed.

We're synchronizing your Digital Membership.

 If your Digital Membership doesn't appear after refreshing the page, please try again in a few moments.

</p>

<button

  onClick={fetchData}

  className="mt-8 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"

>

Refresh Credentials

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


function ProfileRow({ label, value }) {

  return (

    <div className="flex justify-between items-center border-b border-zinc-800 pb-3">

      <span className="text-zinc-500">
        {label}
      </span>

      <span className="text-right font-medium break-all">
        {value || '-'}
      </span>

    </div>

  )

}


