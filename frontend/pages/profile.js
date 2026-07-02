'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { parseAbi } from 'viem'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

function shortenAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function Profile() {
  const { address } = useAccount()
  const publicClient = usePublicClient()

  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])

  const fetchCards = useCallback(async () => {
    if (!address || !publicClient) {
      setCards([])
      return
    }

    setLoading(true)

    try {
      const abi = parseAbi([
        'function tokensOfOwner(address) view returns (uint256[])',
        'function tokenURI(uint256) view returns (string)',
      ])

      const tokenIds = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: 'tokensOfOwner',
        args: [address],
      })

      const owned = []

      for (const tokenId of tokenIds) {
        try {
          const uri = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: 'tokenURI',
            args: [tokenId],
          })

          const res = await fetch(uri)
          const metadata = await res.json()

          owned.push({
            tokenId: Number(tokenId),
            metadata,
          })
        } catch (err) {
          console.error(err)
        }
      }

      setCards(owned)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }, [address, publicClient])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return (
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
              Connect Wallet
            </h2>

            <p className="text-zinc-400">
              Connect your wallet to view your EDGE Spaces credentials.
            </p>

          </div>

        )}

        {address && (

          <>

            <div className="mt-10 mb-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

              <div className="text-xl font-semibold">
                Welcome Back 👋
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
                Loading credentials...
              </div>

            )}

            {!loading && cards.length === 0 && (

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">

               <h2 className="text-xl font-semibold">
  No Membership Found
</h2>

<p className="text-zinc-400 mt-3">
  This wallet is not yet associated with an EDGE Spaces membership.
</p>

<a
  href="/membership"
  className="inline-block mt-6 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
>
  Apply for Membership
</a>

              </div>

            )}

            {!loading && cards.length > 0 && (
            <>
            <div className="mb-8">

      <h2 className="text-2xl font-semibold">
      Your EDGE Spaces Credentials
      </h2>

      <p className="text-zinc-400 mt-2">
      Your wallet has been verified and contains the following digital credentials.
      </p>
      </div>


      <div className="space-y-8">


                {cards.map((card) => (

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

                        {card.metadata.attributes?.map((attr, index) => (

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

                      {card.metadata.external_url && (

                        <a
                          href={card.metadata.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-8 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                        >
                          Visit EDGE Spaces
                        </a>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </>

          )}

          </>

        )}

      </div>

    </div>
  )
}
