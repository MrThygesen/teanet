//frontend/components/WebAccessSBT.js
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


return (

<div className="min-h-screen bg-zinc-950 text-white">

  {/* HEADER */}
  <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-700">

    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold">
        Community Participation
      </h1>

      <p className="text-zinc-400 text-sm mt-2">
        Identity and participation infrastructure for members,
        partners and investment communities.
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
          Communities
        </button>

        <button
          onClick={() => setActiveTab('myassets')}
          className={`px-4 py-2 rounded ${
            activeTab === 'myassets'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          My Credentials
        </button>

        <button
          onClick={() => setShowExplainer(true)}
          className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          How It Works
        </button>

        <button
          onClick={() => setShowRWAInfo(true)}
          className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          Future Roadmap
        </button>

        <button
          onClick={() => setShowWalletSetup(true)}
          className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          Wallet Setup
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


  {/* ROADMAP PANEL */}

  <div className="max-w-6xl mx-auto px-6 pt-8">

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h3 className="font-semibold mb-4">
        TEANET Roadmap
      </h3>

      <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-400">

        <div>
          <div>✓ Identity</div>
          <div>✓ Community Membership</div>
          <div>✓ Open Credentials</div>
          <div>✓ Admin Credentials</div>
        </div>

        <div>
          <div>◌ Participation</div>
          <div>◌ Community Voting</div>
          <div>◌ Governance</div>
          <div>◌ Sponsor Programs</div>
        </div>

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

            <p className="text-sm text-zinc-400">
              {shorten(sbt.description)}
            </p>

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

              I confirm that I meet the membership requirements.

            </label>

            <div className="flex gap-2">

              <button
                onClick={() => setPreview(sbt)}
                className="flex-1 px-3 py-2 text-sm rounded bg-zinc-700 hover:bg-zinc-600"
              >
                Preview
              </button>

              <button
                disabled={
                  loadingTypeId === sbt.typeId || !address
                }
                onClick={() => handleClaim(sbt.typeId)}
                className="flex-1 px-3 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700"
              >
                {loadingTypeId === sbt.typeId
                  ? 'Joining...'
                  : 'Join'}
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
        Connect your wallet to view your credentials.
      </p>
    )}

    {address && loadingMySBTs && (
      <Spinner label="Loading your credentials..." />
    )}

    {address && !loadingMySBTs && mySBTs.length === 0 && (
      <p className="text-zinc-500">
        No credentials found for this wallet.
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
How Participation Works
</h2>

<div className="space-y-4 text-zinc-300 text-sm">

<p>
TEANET provides portable credentials for members, partners and ecosystem participants.
</p>

<p>
Communities may issue memberships directly or allow members to claim them themselves.
</p>

<p>
Credentials remain linked to the participant's wallet over time.
</p>

<p>
Communities may use credentials to support access, participation, collaboration and future governance.
</p>

</div>

</div>

</div>

)}



{/* ROADMAP */}

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
TEANET Roadmap
</h2>

<div className="space-y-5 text-zinc-300 text-sm leading-relaxed">

<div>

<div className="font-semibold mb-1">
Identity
</div>

<p>
Wallet-based credentials for members and ecosystem participants.
</p>

</div>


<div>

<div className="font-semibold mb-1">
Membership
</div>

<p>
Communities can issue or approve memberships.
</p>

</div>


<div>

<div className="font-semibold mb-1">
Participation
</div>

<p>
Credentials may unlock events, access and collaboration.
</p>

</div>


<div>

<div className="font-semibold mb-1">
Voting
</div>

<p>
Future communities may introduce member approval and governance.
</p>

</div>


<div>

<div className="font-semibold mb-1">
Sponsor Programs
</div>

<p>
Communities may eventually coordinate grants and ecosystem initiatives.
</p>

</div>

<hr className="border-zinc-700" />

<p className="text-zinc-400">

Current capabilities:

<br />
✓ Identity

<br />
✓ Membership

<br />
✓ Open Claiming

<br />
✓ Admin Issuance

</p>

</div>

</div>

</div>

)}



{/* CONTACT */}

{showContact && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 relative">

<button
onClick={() => setShowContact(false)}
className="absolute top-3 right-3 text-zinc-400 hover:text-white"
>
✕
</button>

<h2 className="text-xl font-bold mb-3">
Request a Demo
</h2>

<p className="text-zinc-300 text-sm">

Founder:

<span className="font-semibold ml-1">
Morten Thygesen
</span>

</p>

<p className="mt-4 text-zinc-400 text-sm">

Connect on LinkedIn to request a demo,
discuss partnership opportunities,
or learn more about TEANET and EDGE Alliance.

</p>

<a
href="https://www.linkedin.com/in/mortenthygesens/"
target="_blank"
rel="noopener noreferrer"
className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline text-sm"
>

LinkedIn Profile

</a>

</div>

</div>

)}



{/* FOOTER */}

<footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">

<div>
TEANET
</div>

<div className="mt-1">
Trust & Identity Layer of EDGE Alliance
</div>

</footer>

</div>

)
}



