// WebAccessSBT
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

function shorten(text, n = 100) {
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
  const [loading, setLoading] = useState(true)
  const [loadingTypeId, setLoadingTypeId] = useState(null)

  const [mySBTs, setMySBTs] = useState([])
  const [loadingMySBTs, setLoadingMySBTs] = useState(false)

  const [preview, setPreview] = useState(null)
  const [policyAccepted, setPolicyAccepted] = useState({})
  const [filter, setFilter] = useState('all')

  // ---------- Mount guard ----------
  useEffect(() => setMounted(true), [])

  // ---------- Load Available SBT Types ----------
  const fetchSBTs = useCallback(async () => {
    if (!publicClient) return
    setLoading(true)

    const list = []
    const maxTypes = 100

    for (let i = 1; i <= maxTypes; i++) {
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
        if (supply >= maxSupply) continue

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
        'function balanceOf(address) view returns (uint256)',
        'function tokenOfOwnerByIndex(address,uint256) view returns (uint256)',
        'function tokenURI(uint256) view returns (string)',
      ])

      const balance = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: 'balanceOf',
        args: [address],
      })

      const owned = []

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, i],
        })

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
    if (!address) {
      toast.error('Connect wallet first')
      return
    }

    if (!policyAccepted[typeId]) {
      toast.error('Please confirm certified investor status')
      return
    }

    try {
      setLoadingTypeId(typeId)

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: parseAbi(['function claim(uint256)']),
        functionName: 'claim',
        args: [typeId],
      })

      toast.success('SBT claimed successfully')
      await fetchSBTs()
      await fetchMySBTs()
    } catch (err) {
      toast.error(err.message || 'Claim failed')
    } finally {
      setLoadingTypeId(null)
    }
  }

  // ---------- Filter ----------
  const filtered =
    filter === 'all'
      ? available
      : available.filter((s) => s.rwaType.toLowerCase() === filter)

  if (!mounted) return null

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-700">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-3">
            TEA Network — Real World Asset Access
          </h1>
          <p className="text-zinc-400">
            On-chain participation in curated real-world opportunities.
          </p>
        </div>
      </div>

      {/* MY SBTs */}
      {address && (
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
          <h2 className="text-2xl font-semibold mb-4">My SBTs</h2>

          {loadingMySBTs && (
            <p className="text-zinc-400 text-sm">Loading your SBTs…</p>
          )}

          {!loadingMySBTs && mySBTs.length === 0 && (
            <p className="text-zinc-500 text-sm">
              You don’t own any SBTs yet.
            </p>
          )}

          {mySBTs.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {mySBTs.map((sbt) => (
                <div key={sbt.tokenId}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  {sbt.image && (
                    <img src={sbt.image}
                      className="h-36 w-full object-cover"
                      alt={sbt.name} />
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

      {/* FILTER */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-3">
        {['all', 'security', 'utility', 'pool'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm border ${
              filter === f
                ? 'bg-blue-600 border-blue-500'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-16 text-zinc-400">
          Loading opportunities…
        </div>
      )}

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        {filtered.map((sbt) => (
          <div key={sbt.typeId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow hover:border-zinc-600 transition">

            {sbt.image && (
              <img src={sbt.image}
                className="h-40 w-full object-cover"
                alt={sbt.name} />
            )}

            <div className="p-4 space-y-3">
              <span className={`text-xs px-3 py-1 rounded-full ${badgeColor(sbt.rwaType)}`}>
                {sbt.rwaType}
                {sbt.model && ` • ${sbt.model}`}
              </span>

              <h3 className="text-lg font-semibold">{sbt.name}</h3>

              <p className="text-sm text-zinc-400">
                {shorten(sbt.description)}
              </p>

              <p className="text-xs text-zinc-500">
                {sbt.minted} of {sbt.maxSupply} claimed
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
                I confirm I am a certified / qualified investor
              </label>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setPreview(sbt)}
                  className="flex-1 px-3 py-2 text-sm rounded border border-zinc-600 hover:border-zinc-400">
                  Preview
                </button>

                <button
                  disabled={loadingTypeId === sbt.typeId || !address}
                  onClick={() => handleClaim(sbt.typeId)}
                  className="flex-1 px-3 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700">
                  {!address
                    ? 'Connect Wallet'
                    : loadingTypeId === sbt.typeId
                      ? 'Claiming…'
                      : 'Claim'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 max-w-lg w-full rounded-xl p-6 relative border border-zinc-700">

            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-4 text-xl text-zinc-400 hover:text-white">
              ×
            </button>

            {preview.image && (
              <img src={preview.image}
                className="w-full h-48 object-cover rounded mb-4" />
            )}

            <h3 className="text-xl font-semibold mb-2">{preview.name}</h3>

            <p className="text-sm text-zinc-300 mb-4">
              {preview.description}
            </p>

            <div className="space-y-1 text-xs text-zinc-400">
              {preview.metadata?.attributes?.map((attr, i) => (
                <div key={i}>
                  <span className="text-zinc-500">{attr.trait_type}:</span>{' '}
                  {attr.value}
                </div>
              ))}
            </div>

            {preview.external_url && (
              <a href={preview.external_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block mt-4 text-sm text-blue-400 underline">
                View Legal Documentation
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

