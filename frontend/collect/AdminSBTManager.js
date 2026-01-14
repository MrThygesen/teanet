// frontend/components/AdminSBTManager.js
'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, usePublicClient } from 'wagmi'
import WebAccessSBTV33_ABI from '../abis/WebAccessSBTV33_ABI.json'
import { toast } from 'react-hot-toast'

const CONTRACT_ADDRESS = '0xA508A0f5733bcfcf6eA0b41ca9344c27855FeEF0'
const MAX_TYPES = 100

export default function AdminSBTManager() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()
  const isAdmin = address?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

  // --- States ---
  const [title, setTitle] = useState('')
  const [burnable, setBurnable] = useState(false)
  const [maxSupply, setMaxSupply] = useState('')
  const [typeId, setTypeId] = useState(1n)
  const [loading, setLoading] = useState(false)
  const [sbtTypesData, setSbtTypesData] = useState([])
  const [availableTemplates, setAvailableTemplates] = useState([])
  const [burnTokenId, setBurnTokenId] = useState('')
  const [previewData, setPreviewData] = useState(null)

  const buildUri = (filename) =>
    `https://raw.githubusercontent.com/MrThygesen/TEA/main/data/${filename}`

  const formatDisplayName = (filename) =>
    filename.replace('.json', '').replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  // --- Load Metadata Templates ---
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch('https://api.github.com/repos/MrThygesen/TEA/contents/data')
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

  // --- Load On-Chain SBT Types ---
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

  // --- Handlers ---
  const handlePreview = async () => {
    const uri = buildUri(title)
    try {
      const res = await fetch(uri)
      const metadata = await res.json()
      setPreviewData(metadata)
      toast.success(`🔍 Preview: ${metadata.name}`)
    } catch {
      toast.error('Preview failed')
    }
  }

  const handleCreateType = async () => {
    if (!title || !maxSupply || !typeId) return toast.error('Please fill all fields')
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
      setLoading(false)
    } catch (err) {
      console.error(err)
      toast.error('Creation failed')
      setLoading(false)
    }
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
      setLoading(false)
    } catch (err) {
      console.error(err)
      toast.error('Activation failed')
      setLoading(false)
    }
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
      setLoading(false)
    } catch (err) {
      console.error(err)
      toast.error('Deactivation failed')
      setLoading(false)
    }
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
      setLoading(false)
    } catch (err) {
      console.error(err)
      toast.error('Burn failed')
      setLoading(false)
    }
  }

  // --- Render ---
  if (!isAdmin)
    return <div className="text-center text-red-600 font-semibold p-4">You must be admin to access SBT panel.</div>

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Admin — Manage SBT Types</h2>

      {/* Create Section */}
      <div className="p-4 bg-white rounded shadow space-y-3">
        <h3 className="text-lg font-semibold">Create New SBT Type</h3>
        <input type="number" value={typeId.toString()} onChange={(e) => setTypeId(BigInt(e.target.value))} className="w-full border p-2 rounded" placeholder="Type ID" />
        <select value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select metadata</option>
          {availableTemplates.map((file, i) => (
            <option key={i} value={file}>{formatDisplayName(file)}</option>
          ))}
        </select>
        <input type="number" value={maxSupply} onChange={(e) => setMaxSupply(e.target.value)} className="w-full border p-2 rounded" placeholder="Max Supply" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={burnable} onChange={(e) => setBurnable(e.target.checked)} /> Burnable
        </label>
        <div className="flex gap-2">
          <button onClick={handleCreateType} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          <button onClick={handleActivate} className="px-4 py-2 bg-green-600 text-white rounded">Activate</button>
          <button onClick={handleDeactivate} className="px-4 py-2 bg-yellow-600 text-white rounded">Deactivate</button>
          <button onClick={handlePreview} className="px-4 py-2 bg-gray-600 text-white rounded">Preview</button>
        </div>
      </div>

      {/* Preview */}
      {previewData && (
        <div className="p-4 border rounded bg-white">
          <h4 className="font-semibold">{previewData.name}</h4>
          {previewData.image && <img src={previewData.image} alt={previewData.name} className="w-full max-w-xs rounded" />}
          <p className="text-gray-600 mt-2">{previewData.description}</p>
        </div>
      )}

      {/* List */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">SBT Dashboard</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th>ID</th><th>Title</th><th>Max</th><th>Minted</th><th>Active</th><th>Burnable</th>
            </tr>
          </thead>
          <tbody>
            {sbtTypesData.map((t) => (
              <tr key={t.id} className="border-t">
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

      {/* Burn */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Burn Token</h3>
        <input type="text" value={burnTokenId} onChange={(e) => setBurnTokenId(e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="Token ID" />
        <button onClick={handleBurn} className="px-4 py-2 bg-red-600 text-white rounded">Burn</button>
      </div>
    </div>
  )
}

