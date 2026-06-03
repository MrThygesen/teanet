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

return ( <div className="bg-black text-white min-h-screen">

```
  {/* Header */}
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

  {/* Introduction */}
  <section className="max-w-6xl mx-auto px-6 py-8">
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Membership & Participation Credentials
      </h2>

      <div className="space-y-3 text-zinc-300 text-sm">

        <p>
          TEANET provides blockchain-based membership credentials
          for accelerators, incubators, syndicates, angel groups,
          alliances and investor communities.
        </p>

        <p>
          Memberships are represented by non-transferable
          digital credentials (Soulbound Tokens) linked
          to a wallet address.
        </p>

        <p>
          Credentials may provide access to communities,
          programmes, governance, participation rights,
          voting rights or member-only opportunities.
        </p>

        <div className="pt-2">
          <h3 className="font-semibold text-white mb-2">
            Membership Models
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Self-Service Membership</strong> –
              members claim their own credential.
            </li>

            <li>
              <strong>Administrator-Issued Membership</strong> –
              a programme manager or community secretary
              issues credentials directly to approved
              wallet addresses.
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <h3 className="font-semibold text-white mb-2">
            Wallet Connection
          </h3>

          <p>
            Connect the wallet associated with your membership
            to view credentials, participation rights and
            community memberships.
          </p>
        </div>

      </div>
    </div>
  </section>

  {/* Membership Marketplace */}
  <WebAccessSBT />

  {/* Admin Section */}
  {isConnected && isAdmin && (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <AdminSBTManager />
    </div>
  )}

</div>
```

)
}

