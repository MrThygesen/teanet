'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AdminSBTManager from '../components/AdminSBTManager'
import WebAccessSBT from '../components/WebAccessSBT'

export default function Home() {
  const { isConnected, address } = useAccount()
  const isAdmin =
    address?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

return (
  <div className="bg-black text-white min-h-screen">

    {/* Header always visible */}
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold text-blue-400">
          TEA Network — RWA Ownership Demo
        </h1>
        <p className="text-zinc-400 text-sm">
          100% On-chain participation in real-world asset opportunities.
        </p>
        <ConnectButton />
        {isConnected && (
          <p className="text-xs text-zinc-500 font-mono">
            {address}
          </p>
        )}
      </div>
    </header>

    {/* Public Marketplace — always visible */}
    <WebAccessSBT />

    {/* Admin Panel — only visible to admin wallet */}
    {isConnected && isAdmin && (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <AdminSBTManager />
      </div>
    )}

  </div>
)
}

