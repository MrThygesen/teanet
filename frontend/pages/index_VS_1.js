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
    <main className="bg-black text-white min-h-screen flex flex-col items-center py-12 px-4">
      {/* Header */}
      <header className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-lg text-center space-y-4 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-blue-400">
          EDGY EVENTS — SBT NETWORK
        </h1>
        <p className="text-gray-400">
          Connect your wallet to access or manage Soulbound Tokens.
        </p>
        <ConnectButton />
        {isConnected && (
          <p className="text-sm text-gray-400 font-mono break-all">
            {address}
          </p>
        )}
      </header>

      {/* SBT Section */}
      <section className="w-full max-w-6xl mt-10">
        {!isConnected && (
          <p className="text-center text-gray-500">
            Please connect your wallet to continue.
          </p>
        )}

        {isConnected && isAdmin && <AdminSBTManager />}

        {isConnected && !isAdmin && <WebAccessSBT />}
      </section>
    </main>
  )
}

