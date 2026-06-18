//frontend/components/WebAccessSBT.js
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { parseAbi } from 'viem'


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

// ---------------- Helpers ----------------

function badgeColor(type) {
  switch (type?.toLowerCase()) {
    case 'security':
      return 'bg-red-600'
    case 'utility':
      return 'bg-blue-600'
    case 'pool':
      return 'bg-purple-600'
    default:
      return 'bg-gray-600'
  }
}

function shorten(text, n = 120) {
  if (!text) return ''
  return text.length > n ? text.slice(0, n) + '…' : text
}

function getAttr(metadata, name) {
  const attr = metadata?.attributes?.find(
    (a) => a.trait_type?.toLowerCase() === name.toLowerCase()
  )
  return attr?.value || ''
}

function Spinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
      <div className="w-10 h-10 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-sm">{label || 'Loading...'}</p>
    </div>
  )
}


// ---------------- Component ----------------

export default function WebAccessSBT() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const [mounted, setMounted] = useState(false)

  const [available, setAvailable] = useState([])
  const [mySBTs, setMySBTs] = useState([])

  const [loading, setLoading] = useState(true)
  const [loadingMySBTs, setLoadingMySBTs] = useState(false)
  
  const [activeTab, setActiveTab] = useState('available')

  const [preview, setPreview] = useState(null)
  const [showExplainer, setShowExplainer] = useState(false)
  const [showWalletSetup, setShowWalletSetup] = useState(false)


  useEffect(() => setMounted(true), [])

  // ---------- Add Amoy Network ----------
  async function addAmoyNetwork() {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x13882', // 80002
          chainName: 'Polygon Amoy Testnet',
          nativeCurrency: {
            name: 'POL',
            symbol: 'POL',
            decimals: 18,
          },
          rpcUrls: ['https://rpc-amoy.polygon.technology/'],
          blockExplorerUrls: ['https://amoy.polygonscan.com/'],
        }],
      })
    } catch (err) {
      console.error('Network add error', err)
    }
  }

  // ---------- Load Available ----------
  const fetchSBTs = useCallback(async () => {
    if (!publicClient) return
    setLoading(true)

    const list = []

    for (let i = 1; i <= 100; i++) {
      try {
        const sbtType = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: parseAbi([
            'function sbtTypes(uint256) view returns (string uri, bool active, uint256 maxSupply, uint256 supply, bool created, bool burnable)',
          ]),
          functionName: 'sbtTypes',
          args: [i],
        })

        const [uri, active, maxSupply, supply, created] = sbtType
        if (!created || !active || !uri) continue

        const res = await fetch(uri)
        const metadata = await res.json()

        list.push({
          typeId: i,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          external_url: metadata.external_url,
          metadata,
          rwaType: getAttr(metadata, 'RWA Type') || 'Utility',
          model: getAttr(metadata, 'Model'),
          minted: Number(supply),
          maxSupply: Number(maxSupply),
        })
      } catch {}
    }

    setAvailable(list)
    setLoading(false)
  }, [publicClient])

  // ---------- Load My SBTs ----------
  const fetchMySBTs = useCallback(async () => {
    if (!publicClient || !address) {
      setMySBTs([])
      return
    }

    setLoadingMySBTs(true)

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
          name: metadata.name,
          image: metadata.image,
          description: metadata.description,
        })
      }

      setMySBTs(owned)
    } catch (err) {
      console.error('Failed loading owned SBTs', err)
    }

    setLoadingMySBTs(false)
  }, [publicClient, address])

  useEffect(() => {
    fetchSBTs()
    fetchMySBTs()
  }, [fetchSBTs, fetchMySBTs])

 
  if (!mounted) return null


return (

<div className="min-h-screen bg-zinc-950 text-white">

  {/* HEADER */}
  <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-700">

    <div className="max-w-6xl mx-auto px-6 py-10">

     <h1 className="text-4xl font-bold">
  Community Showcases
</h1>

<p className="text-zinc-400 text-sm mt-2">
  Explore community examples and public showcases.
</p>

      <div className="mt-6 flex flex-wrap gap-3">

<button
  onClick={() => setActiveTab('available')}
  className={`px-4 py-2 rounded ${
    activeTab === 'available'
      ? 'bg-blue-600 text-white'
      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
  }`}
>
 Community Showcases
</button>

<button
  onClick={() => setActiveTab('myassets')}
  className={`px-4 py-2 rounded ${
    activeTab === 'myassets'
      ? 'bg-blue-600 text-white'
      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
  }`}
>
  My Cards
</button>

<button
  onClick={() => setShowExplainer(true)}
  className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
>
  How Membership Works
</button>

<button
  onClick={() => setShowWalletSetup(true)}
  className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
>
  Wallet Setup
</button>


      </div>
    </div>
  </div>





  {/* COMMUNITIES */}

  {activeTab === 'available' && (

    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

      {loading && (
        <Spinner label="Loading communities..." />
      )}

      {!loading && available.map((sbt) => (

        <div
          key={sbt.typeId}
          className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
        >

          {sbt.image && (
            <img
              src={sbt.image}
              className="h-40 w-full object-cover"
            />
          )}

          <div className="p-4 space-y-3">

            <span
              className={`text-xs px-3 py-1 rounded-full ${badgeColor(sbt.rwaType)}`}
            >
              {sbt.rwaType}
            </span>

            <h3 className="text-lg font-semibold">
              {sbt.name}
            </h3>

<div className="flex flex-wrap gap-2">

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Membership Type')}
  </span>

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Community Status') || 'Forming'}
  </span>

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Participation') || 'Contact Founder'}
  </span>

</div>



            <p className="text-sm text-zinc-400">
              {shorten(sbt.description)}
            </p>

              <div>

  <button
    onClick={() => setPreview(sbt)}
    className="w-full px-3 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700"
  >
    Preview
  </button>

</div>

          </div>

        </div>

      ))}

    </div>

  )}


{/* MY ASSETS */}

{/* MY CREDENTIALS */}
{activeTab === 'myassets' && (
  <div className="max-w-6xl mx-auto px-6 py-10">

    {!address && (
      <p className="text-zinc-400">
        Connect your wallet to view your cards.
      </p>
    )}

    {address && loadingMySBTs && (
     <Spinner label="Loading your membership cards..." />
    )}

    {address && !loadingMySBTs && mySBTs.length === 0 && (
      <p className="text-zinc-500">
       No membership cards found for this wallet.
      </p>
    )}

    {address && mySBTs.length > 0 && (
      <div className="grid md:grid-cols-3 gap-6">

        {mySBTs.map((sbt) => (

          <div
            key={sbt.tokenId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
          >

            {sbt.image && (
              <img
                src={sbt.image}
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-4">

              <h3 className="font-semibold">
                {sbt.name}
              </h3>

<div className="flex flex-wrap gap-2">

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Membership Type')}
  </span>

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Community Status') || 'Forming'}
  </span>

  <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
    {getAttr(sbt.metadata, 'Participation') || 'Contact Founder'}
  </span>

</div>




              <p className="text-xs text-zinc-500 mt-1">
                Credential #{sbt.tokenId}
              </p>

            </div>

          </div>

        ))}

      </div>
    )}

  </div>
)}


{/* HOW IT WORKS */}

{showExplainer && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">

<button
onClick={() => setShowExplainer(false)}
className="absolute top-3 right-3 text-zinc-400 hover:text-white"
>
✕
</button>

<h2 className="text-2xl font-bold mb-4">
How Membership Cards Work
</h2>

<div className="space-y-4 text-zinc-300 text-sm">

<p>
Community showcases illustrate the types of memberships and ecosystems supported by EDGE Spaces.
</p>

<p>
Official membership cards are issued separately to approved members.
</p>

<p>
Digital memberships may support participation, voting and future ecosystem benefits.
</p>

</div>

</div>

</div>

)}




{/* WALLET SETUP */}

{showWalletSetup && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">

<button
onClick={() => setShowWalletSetup(false)}
className="absolute top-3 right-3 text-zinc-400 hover:text-white"
>
✕
</button>

<h2 className="text-2xl font-bold mb-4">
Wallet Setup
</h2>

<div className="space-y-5 text-sm text-zinc-300">

<div>

<p className="font-semibold">
1. Download a Wallet
</p>

<a
href="https://metamask.io/download/"
target="_blank"
className="text-blue-400 underline"
>
Download MetaMask
</a>

<p className="text-zinc-400 text-xs mt-1">
Rabby Wallet also works.
</p>

</div>


<div>

<p className="font-semibold">
2. Add Polygon Amoy Test Network
</p>

<button
onClick={addAmoyNetwork}
className="mt-2 px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
>
Add Network Automatically
</button>

<p className="text-zinc-400 text-xs mt-3">
Manual settings:
</p>

<div className="bg-zinc-800 rounded p-3 mt-2 text-xs font-mono space-y-1">

<div>Network: Polygon Amoy Testnet</div>
<div>Chain ID: 80002</div>
<div>Currency: POL</div>
<div>Explorer: https://amoy.polygonscan.com/</div>

</div>

</div>


<div>

<p className="font-semibold">
3. Get Coins to claim cards.
</p>

<p className="text-zinc-400 text-xs">
Contact the founder on LinkedIn to receive free test coins.
</p>

</div>

</div>

</div>

</div>

)}





{/* PREVIEW */}

{preview && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

  <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">

    <button
      onClick={() => setPreview(null)}
      className="absolute top-3 right-3 text-zinc-400 hover:text-white"
    >
      ✕
    </button>

    {preview.image && (
      <img
        src={preview.image}
        className="rounded-xl mb-5 w-full h-56 object-cover"
      />
    )}

    <h2 className="text-2xl font-bold mb-3">
      {preview.name}
    </h2>

    <p className="text-zinc-400 text-sm mb-5">
      {preview.description}
    </p>

    <div className="space-y-2 text-sm">

      {preview.metadata?.attributes?.map((attr, index) => (

        <div
          key={index}
          className="flex justify-between border-b border-zinc-800 pb-2"
        >

          <span className="text-zinc-500">
            {attr.trait_type}
          </span>

          <span className="text-zinc-200">
            {attr.value}
          </span>

        </div>

      ))}

    </div>

    {preview.external_url && (

      <a
        href={preview.external_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
      >
        View PDF
      </a>

    )}

  </div>

</div>

)}

{/* FOOTER */}

<footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">

<div>
EDGE Spaces
</div>

<div className="mt-1">
Digital memberships for founders, builders and investors.
</div>

</footer>

</div>

)
}



