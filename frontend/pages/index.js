'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AdminSBTManager from '../components/AdminSBTManager'
import WebAccessSBT from '../components/WebAccessSBT'

export default function Home() {
  const { isConnected, address } = useAccount()

  const isAdmin =
    address?.toLowerCase() ===
    process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

  return (
    <div className="bg-black text-white min-h-screen">

      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-4">

          <h1 className="text-4xl font-bold text-blue-400">
            TEANET
          </h1>

          <p className="text-xl text-center text-zinc-200">
            Participation Infrastructure for Investment Communities
          </p>

          <p className="text-sm text-center text-zinc-400 max-w-3xl">
            Blockchain-based memberships for accelerators,
            syndicates, angel groups and investor ecosystems.
          </p>

          <ConnectButton />

          {isConnected && (
            <p className="text-xs text-zinc-500 font-mono">
              Connected Wallet: {address}
            </p>
          )}

        </div>
      </header>

<section className="max-w-6xl mx-auto px-6 py-10">

  <div className="grid md:grid-cols-4 gap-4 mb-8">

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
      <div className="text-lg font-semibold">Accelerators</div>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
      <div className="text-lg font-semibold">Incubators</div>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
      <div className="text-lg font-semibold">Syndicates</div>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
      <div className="text-lg font-semibold">Alliances</div>
    </div>

  </div>

  <div className="text-center">

    <h2 className="text-3xl font-bold">
      TEANET
    </h2>

    <p className="mt-3 text-zinc-300">
      Blockchain-based memberships for accelerators,
      syndicates, angel groups and investor ecosystems.
    </p>

    <p className="mt-2 text-zinc-500 text-sm">
      Part of the EDGE Alliance
    </p>

  </div>

</section>
      <WebAccessSBT />

      {isConnected && isAdmin && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <AdminSBTManager />
        </div>
      )}

    </div>
  )
}
