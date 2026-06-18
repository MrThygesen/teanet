// pages/wallet-setup.js

'use client'

import WebAccessSBT from '../components/WebAccessSBT'

export default function WalletSetup() {

  return (

    <div className="bg-black text-white min-h-screen">

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Wallet Setup
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Prepare Your Wallet
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Digital memberships require Polygon Amoy to be configured
            in your wallet.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Once setup is complete, EDGE Spaces can issue membership
            cards directly to your wallet.

          </p>

        </div>

      </section>

      <section className="border-t border-zinc-800">

        <WebAccessSBT />

      </section>

    </div>

  )

}
