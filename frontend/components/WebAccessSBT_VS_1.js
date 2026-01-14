'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount, useWriteContract, usePublicClient } from 'wagmi'
import { parseAbi } from 'viem'
import { toast } from 'react-hot-toast'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const styles = {
  container: 'min-h-screen p-4 max-w-5xl mx-auto',
  btnPrimary:
    'px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed',
  btnSecondary:
    'px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50',
  tagBadgeActive: 'bg-blue-600 text-white text-xs px-3 py-1 rounded-full',
  tagBadgeInactive: 'border border-blue-400 text-blue-400 text-xs px-3 py-1 rounded-full',
  tagBadge: 'border border-blue-400 text-blue-200 text-xs px-2 py-1 rounded-full',
  sbtCard: 'border rounded p-4 text-left',
  sbtImage: 'w-full h-40 object-cover rounded mb-2',
  previewModalBg: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50',
  previewModalContentDark: 'relative p-6 rounded-lg max-w-md w-full bg-gray-900 text-white text-left',
  previewCloseButton: 'absolute top-2 right-3 text-2xl font-bold cursor-pointer',
  flexWrapGap2: 'flex flex-wrap gap-2 mt-2',
  textGray400: 'text-xs mt-2 text-gray-400',
  gridMd3Gap4: 'grid md:grid-cols-3 gap-4 mb-6',
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  )
}

function shortenText(text, maxLen = 120) {
  if (!text) return ''
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
}

export default function WebAccessSBT() {
  // --- Wallet hooks
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  // --- Mounted guard state
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // --- App state hooks
  const [availableSBTs, setAvailableSBTs] = useState([])
  const [ownedSBTs, setOwnedSBTs] = useState([])
  const [previewSBT, setPreviewSBT] = useState(null)
  const [loadingTypeId, setLoadingTypeId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState([])
  const [showOwned, setShowOwned] = useState(true)
  const [policyAccepted, setPolicyAccepted] = useState({})

  // --- Helpers
  const extractTags = (attributes) => {
    if (!attributes || !Array.isArray(attributes)) return []
    const tagsAttr = attributes.find(
      (attr) =>
        attr.trait_type?.toLowerCase() === 'tags' ||
        attr.trait_type?.toLowerCase() === 'tag'
    )
    if (!tagsAttr?.value) return []
    return tagsAttr.value.split(',').map((t) => t.trim()).filter(Boolean)
  }

  // --- Fetch blockchain + metadata
  const fetchSBTs = useCallback(async () => {
    if (!address || !publicClient) return
    setIsLoading(true)

    const owned = []
    const available = []
    const maxTypeCount = 100
    const ownedTypeIds = new Set()

    // Owned tokens
    let tokenIds = []
    try {
      tokenIds = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: parseAbi(['function tokensOfOwner(address) view returns (uint256[])']),
        functionName: 'tokensOfOwner',
        args: [address],
      })
    } catch {}

    for (const tokenId of tokenIds) {
      try {
        const [typeId, uri] = await Promise.all([
          publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: parseAbi(['function typeOf(uint256) view returns (uint256)']),
            functionName: 'typeOf',
            args: [tokenId],
          }),
          publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: parseAbi(['function tokenURI(uint256) view returns (string)']),
            functionName: 'tokenURI',
            args: [tokenId],
          }),
        ])

        const res = await fetch(uri)
        const metadata = await res.json()
        ownedTypeIds.add(Number(typeId))

        owned.push({
          tokenId: Number(tokenId),
          typeId: Number(typeId),
          name: metadata.name,
          image: metadata.image,
          description: metadata.description,
          tags: extractTags(metadata.attributes),
          metadata,
        })
      } catch {}
    }

    // Available types
    for (let i = 1; i <= maxTypeCount; i++) {
      if (ownedTypeIds.has(i)) continue
      try {
        const [uri, active, maxSupply, supply, created] =
          await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: parseAbi([
              'function sbtTypes(uint256) view returns (string uri, bool active, uint256 maxSupply, uint256 supply, bool created, bool burnable)',
            ]),
            functionName: 'sbtTypes',
            args: [i],
          })

        if (!created || !active || supply >= maxSupply) continue

        const res = await fetch(uri)
        const metadata = await res.json()

        available.push({
          typeId: i,
          name: metadata.name,
          image: metadata.image,
          description: metadata.description,
          tags: extractTags(metadata.attributes),
          tokensLeft: Number(maxSupply - supply),
          metadata,
        })
      } catch {}
    }

    setOwnedSBTs(owned)
    setAvailableSBTs(available)
    setIsLoading(false)
  }, [address, publicClient])

  useEffect(() => {
    fetchSBTs()
  }, [fetchSBTs])

  // --- Claim handler
  const handleClaim = async (typeId) => {
    if (ownedSBTs.some((s) => s.typeId === typeId)) {
      toast.error('Already claimed')
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
      toast.success('Claimed!')
      fetchSBTs()
    } catch {
      toast.error('Claim failed')
    } finally {
      setLoadingTypeId(null)
    }
  }

  // --- Filters
  const allTags = Array.from(
    new Set([...availableSBTs.flatMap((s) => s.tags), ...ownedSBTs.flatMap((s) => s.tags)])
  ).sort()

  const filteredAvailable =
    selectedTags.length === 0
      ? availableSBTs
      : availableSBTs.filter((s) => selectedTags.every((t) => s.tags.includes(t)))

  const filteredOwned =
    selectedTags.length === 0
      ? ownedSBTs
      : ownedSBTs.filter((s) => selectedTags.every((t) => s.tags.includes(t)))

  // --- ✅ Guard AFTER all hooks
  if (!mounted) return null

  // --- Render
  return (
    <div className="bg-black text-white min-h-screen">
      <div className={styles.container}>
        <h1 className="text-3xl font-bold mb-6">Available Deals</h1>

        {isLoading && <LoadingSpinner />}

        {/* Owned */}
        {showOwned && filteredOwned.length > 0 && (
          <>
            <h2 className="text-xl mb-3">Your Deals</h2>
            <div className={styles.gridMd3Gap4}>
              {filteredOwned.map((sbt) => (
                <div key={sbt.tokenId} className={styles.sbtCard}>
                  <img src={sbt.image} className={styles.sbtImage} />
                  <h3>{sbt.name}</h3>
                  <p>{shortenText(sbt.description)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Available */}
        {!isLoading && (
          <>
            <h2 className="text-xl mb-3 mt-6">Available</h2>
            <div className={styles.gridMd3Gap4}>
              {filteredAvailable.map((sbt) => (
                <div key={sbt.typeId} className={styles.sbtCard}>
                  <img src={sbt.image} className={styles.sbtImage} />
                  <h3>{sbt.name}</h3>
                  <p>{shortenText(sbt.description)}</p>

                  <button
                    disabled={loadingTypeId === sbt.typeId}
                    onClick={() => handleClaim(sbt.typeId)}
                    className={styles.btnPrimary}
                  >
                    {loadingTypeId === sbt.typeId ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

