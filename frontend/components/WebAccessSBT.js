'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount, useWriteContract, usePublicClient } from 'wagmi'
import { parseAbi } from 'viem'
import { toast } from 'react-hot-toast'

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

// ---------------- Component ----------------

export default function WebAccessSBT() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  const [mounted, setMounted] = useState(false)

  const [available, setAvailable] = useState([])
  const [mySBTs, setMySBTs] = useState([])

  const [loading, setLoading] = useState(true)
  const [loadingMySBTs, setLoadingMySBTs] = useState(false)
  const [loadingTypeId, setLoadingTypeId] = useState(null)

  const [policyAccepted, setPolicyAccepted] = useState({})
  const [activeTab, setActiveTab] = useState('available')

  const [preview, setPreview] = useState(null)
  const [showExplainer, setShowExplainer] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showWalletSetup, setShowWalletSetup] = useState(false)
  const [showRWAInfo, setShowRWAInfo] = useState(false)


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

  // ---------- Claim ----------
  async function handleClaim(typeId) {
    if (!address) return toast.error('Connect wallet')

    if (!policyAccepted[typeId]) {
      return toast.error('Confirm investor status')
    }

    try {
      setLoadingTypeId(typeId)

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: parseAbi(['function claim(uint256)']),
        functionName: 'claim',
        args: [typeId],
      })

      toast.success('SBT claimed')

      await fetchSBTs()
      await fetchMySBTs()
    } catch (err) {
      toast.error(err.message || 'Claim failed')
    } finally {
      setLoadingTypeId(null)
    }
  }

  if (!mounted) return null

  // ---------------- Render ----------------

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-700">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold">RWA DEMO</h1>
          <p className="text-zinc-400 text-sm">(No real assets — demonstration only)</p>

<div className="mt-6 flex flex-wrap gap-3">

  {/* Tabs */}
  <button
    onClick={() => setActiveTab('available')}
    className={`px-4 py-2 rounded ${
      activeTab === 'available'
        ? 'bg-blue-600 text-white'
        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
    }`}
  >
    Available Assets
  </button>

  <button
    onClick={() => setActiveTab('myassets')}
    className={`px-4 py-2 rounded ${
      activeTab === 'myassets'
        ? 'bg-blue-600 text-white'
        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
    }`}
  >
    My Assets
  </button>

  {/* Info Buttons */}
  <button
    onClick={() => setShowExplainer(true)}
    className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
  >
    How it works
  </button>

<button
  onClick={() => setShowRWAInfo(true)}
  className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
>
  RWA Concept
</button>


  <button
    onClick={() => setShowWalletSetup(true)}
    className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
  >
    Get Wallet / Coins
  </button>

  <button
    onClick={() => setShowContact(true)}
    className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
  >
    Contact
  </button>

</div>
        </div> 
      </div>    
      {/* AVAILABLE */}
      {activeTab === 'available' && (
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          {loading && <p className="text-zinc-400">Loading assets…</p>}

          {!loading && available.map((sbt) => (
            <div key={sbt.typeId} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              {sbt.image && <img src={sbt.image} className="h-40 w-full object-cover" />}

              <div className="p-4 space-y-3">
                <span className={`text-xs px-3 py-1 rounded-full ${badgeColor(sbt.rwaType)}`}>
                  {sbt.rwaType}
                </span>

                <h3 className="text-lg font-semibold">{sbt.name}</h3>
                <p className="text-sm text-zinc-400">{shorten(sbt.description)}</p>

                <p className="text-xs text-zinc-500">
                  {sbt.minted} / {sbt.maxSupply} claimed
                </p>

                <label className="flex items-center gap-2 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={policyAccepted[sbt.typeId] || false}
                    onChange={(e) =>
                      setPolicyAccepted((prev) => ({
                        ...prev,
                        [sbt.typeId]: e.target.checked,
                      }))
                    }
                  />
                  I confirm I am a certified investor
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPreview(sbt)}
                    className="flex-1 px-3 py-2 text-sm rounded bg-zinc-700 hover:bg-zinc-600"
                  >
                    Preview
                  </button>

                  <button
                    disabled={loadingTypeId === sbt.typeId || !address}
                    onClick={() => handleClaim(sbt.typeId)}
                    className="flex-1 px-3 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700"
                  >
                    {loadingTypeId === sbt.typeId ? 'Claiming…' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

{/* MY ASSETS */}
{activeTab === 'myassets' && (
  <div className="max-w-6xl mx-auto px-6 py-10">

    {!address && (
      <p className="text-zinc-400">
        Connect your wallet to view your assets.
      </p>
    )}

    {address && loadingMySBTs && (
      <p className="text-zinc-400">
        Loading your assets…
      </p>
    )}

    {address && !loadingMySBTs && mySBTs.length === 0 && (
      <p className="text-zinc-500">
        No SBTs owned yet.
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
                alt={sbt.name}
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{sbt.name}</h3>
              <p className="text-xs text-zinc-500">
                Token #{sbt.tokenId}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
)}

      {/* HOW IT WORKS MODAL */}
      {showExplainer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">
            <button onClick={() => setShowExplainer(false)} className="absolute top-3 right-3">✕</button>

            <h2 className="text-2xl font-bold mb-4">How this RWA Demo Works</h2>

            <div className="space-y-3 text-zinc-300 text-sm">
              <p>This demo lets you obtain blockchain-based proof of ownership.</p>
              <p>Each SBT represents:</p>
              <ul className="list-disc list-inside ml-2">
                <li>A share in a pool</li>
                <li>A security</li>
                <li>A voting right</li>
                <li>Access to a service</li>
              </ul>
              <p>Once claimed, ownership proof cannot be lost.</p>

              <ol className="list-decimal list-inside space-y-2 mt-3">
                <li>Download a wallet (MetaMask or Rabby).</li>
                <li>Set up your wallet and add the Polygon Amoy Test Network.</li>
                <li>Request free Amoy test coins from the founder via LinkedIn.</li>
                <li>Click Claim on an asset to receive your on-chain proof of ownership.</li>
              </ol>
            </div>
          </div>
        </div>
      )}


{/* RWA CONCEPT MODAL */}
{showRWAInfo && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">

      <button
        onClick={() => setShowRWAInfo(false)}
        className="absolute top-3 right-3 text-zinc-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">
        How this RWA Demo Works
      </h2>

      <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">

        <p>
          This demo showcases blockchain-based proof of ownership using Soulbound Tokens (SBTs).
          Each SBT represents a non-transferable digital certificate linked to a real-world asset model,
          membership, or participation right. Once claimed, ownership or access rights are permanently
          recorded on-chain.
        </p>

        <p>
          Some assets represent participation in a pooled structure.
          In a real deployment, a Special Purpose Vehicle (SPV) would hold underlying assets or revenue contracts.
          Each SBT represents one participation unit in the pool — conceptually
          <span className="font-semibold text-white">{" "}1 investor = 1 share</span>.
          Benefits or revenues would be distributed pro-rata to SBT holders.
        </p>

        <p>
          Some SBTs may additionally grant governance or voting participation in pool or community decisions.
        </p>

        <p>
          This demo does <span className="font-semibold text-white">not</span> create legal securities,
          regulated investments, or real SPVs. It illustrates the technical ownership and participation model only.
        </p>

        <p>
          Pricing and payment logic are intentionally excluded.
          In production, investment amounts, compliance, and settlement would occur off-chain
          before minting ownership SBTs and eventual transfer in stablecoin or FIAT.
        </p>

      </div>
    </div>
  </div>
)}



{/* WALLET SETUP MODAL */}
{showWalletSetup && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-xl w-full p-6 relative">

      <button
        onClick={() => setShowWalletSetup(false)}
        className="absolute top-3 right-3 text-zinc-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">Get Wallet & Setup Network</h2>

      <div className="space-y-4 text-sm text-zinc-300">

        {/* Step 1 */}
        <div>
          <p className="font-semibold">1. Download a Wallet</p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            className="text-blue-400 underline"
          >
            Download MetaMask
          </a>
          <p className="text-zinc-400 text-xs mt-1">
            (Rabby wallet also works)
          </p>
        </div>

        {/* Step 2 */}
        <div>
          <p className="font-semibold">2. Add Polygon Amoy Test Network</p>

          <button
            onClick={addAmoyNetwork}
            className="mt-2 px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
          >
            Add Amoy Network Automatically
          </button>

          <p className="text-zinc-400 text-xs mt-3">
            Or add manually:
          </p>

          <div className="bg-zinc-800 rounded p-3 mt-2 text-xs font-mono space-y-1">
            <div>Network Name: Polygon Amoy Testnet</div>
            <div>RPC URL: https://rpc-amoy.polygon.technology/</div>
            <div>Chain ID: 80002</div>
            <div>Currency Symbol: POL</div>
            <div>Block Explorer: https://amoy.polygonscan.com/</div>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <p className="font-semibold">3. Get Test Coins</p>
          <p className="text-zinc-400 text-xs">
            Contact the founder on LinkedIn to receive free Amoy test coins.  
          </p>
        </div>

      </div>
    </div>
  </div>
)}

{/* PREVIEW MODAL */}
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
          className="h-48 w-full object-cover rounded"
          alt={preview.name}
        />
      )}

      <h2 className="text-xl font-bold mt-4">{preview.name}</h2>

      <p className="text-zinc-400 text-sm mt-2">
        {preview.description}
      </p>

      {/* Attributes if present */}
      {preview.metadata?.attributes && (
        <div className="mt-4 space-y-1 text-sm">
          {preview.metadata.attributes.map((a, idx) => (
            <div key={idx} className="flex justify-between text-zinc-300">
              <span>{a.trait_type}</span>
              <span className="text-zinc-400">{a.value}</span>
            </div>
          ))}
        </div>
      )}

      {preview.external_url && (
        <a
          href={preview.external_url}
          target="_blank"
          className="block mt-4 text-blue-400 text-sm underline"
        >
          External link
        </a>
      )}
    </div>
  </div>
)}


      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setShowContact(false)} className="absolute top-3 right-3">✕</button>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-zinc-300 text-sm">
              Founder: <span className="font-semibold">Morten Thygesen</span>
            </p>
            <a
              href="https://www.linkedin.com/in/mortenthygesens/"
              target="_blank"
              className="block mt-3 text-blue-400 underline text-sm"
            >
              LinkedIn Profile
            </a>
            <p className="mt-4 text-zinc-400 text-xs">
              Contact the founder on LinkedIn to request free Amoy test coins.
            </p>
          </div>
        </div>
      )}



      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} TEA Network — All rights reserved.
      </footer>
    </div>
  )
}

