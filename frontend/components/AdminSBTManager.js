'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, usePublicClient } from 'wagmi'
import WebAccessSBTV33_ABI from '../abis/WebAccessSBTV33_ABI.json'
import { toast } from 'react-hot-toast'



const CONTRACT_ADDRESS = '0x146CE24B31eb28dA2159c8b2162889969cf8Ef03'
const MAX_TYPES = 100

const GITHUB_REPO = 'MrThygesen/teanet'
const GITHUB_BRANCH = 'main'
const DATA_PATH = 'data'

const buildUri = (filename) =>
  `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${DATA_PATH}/${filename}`

const TEMPLATE_LIST_URL =
  `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_PATH}`

export default function AdminSBTManager() {

  // ---------------- WALLET HOOKS ----------------
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  // ---------------- STATE HOOKS ----------------
  const [mounted, setMounted] = useState(false)

  const [title, setTitle] = useState('')
  const [burnable, setBurnable] = useState(false)
  const [maxSupply, setMaxSupply] = useState('')
  const [typeId, setTypeId] = useState(1n)
  const [loading, setLoading] = useState(false)
  const [sbtTypesData, setSbtTypesData] = useState([])
  const [availableTemplates, setAvailableTemplates] = useState([])
  const [burnTokenId, setBurnTokenId] = useState('')
  const [previewData, setPreviewData] = useState(null)

  const isAdmin =
    address?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

  // ---------------- MOUNT GUARD ----------------
  useEffect(() => {
    setMounted(true)
  }, [])

  // ---------------- LOAD TEMPLATE LIST ----------------
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch(TEMPLATE_LIST_URL)
        const data = await res.json()

        const jsonFiles = Array.isArray(data)
          ? data.filter((f) => f.name?.endsWith('.json')).map((f) => f.name)
          : []

        setAvailableTemplates(jsonFiles)
      } catch (err) {
        console.error('❌ Failed to fetch templates:', err)
      }
    }
    fetchTemplates()
  }, [])

  // ---------------- LOAD ONCHAIN TYPES ----------------
  useEffect(() => {
    if (!publicClient) return

    async function fetchTypes() {
      const types = []

      for (let i = 1; i <= MAX_TYPES; i++) {
        try {
          const sbtType = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: WebAccessSBTV33_ABI,
            functionName: 'sbtTypes',
            args: [i],
          })

          const [uri, active, maxSupplyBig, mintedBig, , burnableFlag] = sbtType
          if (!uri) continue

          let title = ''
          try {
            const res = await fetch(uri)
            const metadata = await res.json()
            title = metadata?.name || ''
          } catch {}

          types.push({
            id: i,
            uri,
            active,
            burnable: burnableFlag,
            maxSupply: Number(maxSupplyBig),
            minted: Number(mintedBig),
            title,
          })
        } catch {}
      }

      setSbtTypesData(types)
    }

    fetchTypes()
  }, [publicClient, loading])

  // ---------------- HELPERS ----------------
  const formatDisplayName = (filename) =>
    filename
      .replace('.json', '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

  // ---------------- ACTIONS ----------------
  const handlePreview = async () => {
    if (!title) return toast.error('Select a template first')

    const uri = buildUri(title)

    try {
      const res = await fetch(uri)
      const metadata = await res.json()
      setPreviewData(metadata)
      toast.success(`🔍 Preview loaded`)
    } catch {
      toast.error('Preview failed')
    }
  }

  const handleCreateType = async () => {
    if (!title || !maxSupply || !typeId)
      return toast.error('Please fill all fields')

    setLoading(true)

    try {
      const uri = buildUri(title)

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: WebAccessSBTV33_ABI,
        functionName: 'createType',
        args: [typeId, uri, BigInt(maxSupply), burnable],
      })

      toast.success('SBT type created successfully')
    } catch (err) {
      console.error(err)
      toast.error('Creation failed')
    }

    setLoading(false)
  }

  const handleActivate = async () => {
    setLoading(true)

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: WebAccessSBTV33_ABI,
        functionName: 'setTypeStatus',
        args: [typeId, true],
      })

      toast.success('SBT activated')
    } catch {
      toast.error('Activation failed')
    }

    setLoading(false)
  }

  const handleDeactivate = async () => {
    setLoading(true)

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: WebAccessSBTV33_ABI,
        functionName: 'setTypeStatus',
        args: [typeId, false],
      })

      toast.success('SBT deactivated')
    } catch {
      toast.error('Deactivation failed')
    }

    setLoading(false)
  }

  const handleBurn = async () => {
    if (!burnTokenId) return toast.error('Enter a Token ID')

    setLoading(true)

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: WebAccessSBTV33_ABI,
        functionName: 'burn',
        args: [BigInt(burnTokenId)],
      })

      toast.success('Token burned')
    } catch {
      toast.error('Burn failed')
    }

    setLoading(false)
  }

  // ---------------- SAFE RETURNS ----------------
  if (!mounted) return null

  if (!isAdmin) {
    return (
      <div className="text-center text-red-600 font-semibold p-4">
        You must be admin to access SBT panel.
      </div>
    )
  }

  // ---------------- RENDER ----------------
return (
  <div className="bg-black text-white min-h-screen py-10">
    <div className="p-4 max-w-6xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold">
        Admin — Manage SBT Types
      </h2>

      {/* CREATE */}
      <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Create New SBT Type</h3>

        <input
          type="number"
          value={typeId.toString()}
          onChange={(e) => setTypeId(BigInt(e.target.value))}
          className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded text-white"
          placeholder="Type ID"
        />

        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded text-white"
        >
          <option value="">Select metadata</option>
          {availableTemplates.map((file, i) => (
            <option key={i} value={file}>
              {formatDisplayName(file)}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={maxSupply}
          onChange={(e) => setMaxSupply(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded text-white"
          placeholder="Max Supply"
        />

        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={burnable}
            onChange={(e) => setBurnable(e.target.checked)}
          />
          Burnable
        </label>

        <div className="flex flex-wrap gap-2">
          <button onClick={handleCreateType} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Create
          </button>
          <button onClick={handleActivate} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
            Activate
          </button>
          <button onClick={handleDeactivate} className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">
            Deactivate
          </button>
          <button onClick={handlePreview} className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600">
            Preview
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      {previewData && (
        <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl">
          <h4 className="font-semibold text-lg">{previewData.name}</h4>
          {previewData.image && (
            <img src={previewData.image} className="w-full max-w-xs rounded mt-3" />
          )}
          <p className="text-zinc-300 mt-3">{previewData.description}</p>
        </div>
      )}

      {/* DASHBOARD */}
      <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">SBT Dashboard</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-700">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Max</th>
                <th className="p-2 text-left">Minted</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">Burnable</th>
              </tr>
            </thead>

            <tbody>
              {sbtTypesData.map((t) => (
                <tr key={t.id} className="border-b border-zinc-800">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.title || '-'}</td>
                  <td className="p-2">{t.maxSupply}</td>
                  <td className="p-2">{t.minted}</td>
                  <td className="p-2">{t.active ? '✅' : '❌'}</td>
                  <td className="p-2">{t.burnable ? '🔥' : '🚫'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BURN */}
      <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl">
        <h3 className="font-semibold mb-3">Burn Token</h3>

        <input
          type="text"
          value={burnTokenId}
          onChange={(e) => setBurnTokenId(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded text-white mb-3"
          placeholder="Token ID"
        />

        <button onClick={handleBurn} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          Burn
        </button>
      </div>
    </div>
  </div>
)
}
