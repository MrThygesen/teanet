'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AdminSBTManager from '../components/AdminSBTManager'
import WebAccessSBT from '../components/WebAccessSBT'
import MembershipForm from '../components/MembershipForm'

export default function Home() {
  const { isConnected, address } = useAccount()

  const isAdmin =
    address?.toLowerCase() ===
    process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <div className="text-lg font-semibold text-blue-400">
              TEANET
            </div>

            <div className="text-xs text-zinc-500">
              Trust & Identity Layer of EDGE Alliance
            </div>

          </div>

          <ConnectButton />

        </div>

      </header>

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Part of EDGE Alliance
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Trust & Identity Infrastructure
            <br />
            for Investment Communities
          </h1>

          <p className="mt-6 text-xl text-zinc-400 leading-relaxed">
            Portable credentials and participation infrastructure for
            members, partners and investment communities.
          </p>

        </div>

        {/* ===================================================== */}
        {/* FEATURE CARDS */}
        {/* ===================================================== */}

        <div className="grid md:grid-cols-3 gap-5 mt-14">

          <FeatureCard
            title="Membership Credentials"
            text="Issue credentials to members, partners and ecosystem participants."
          />

          <FeatureCard
            title="Community Creation"
            text="Create curated or open communities with configurable membership models."
          />

          <FeatureCard
            title="Participation Layer"
            text="Support voting and future governance across trusted communities."
          />

        </div>

        {/* ===================================================== */}
        {/* COMMUNITIES */}
        {/* ===================================================== */}

        <div className="mt-16 border-t border-zinc-800 pt-10">

          <div className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
            Communities
          </div>

          <div className="flex flex-wrap gap-3">

            <Tag text="Investor Communities" />
            <Tag text="Angel Networks" />
            <Tag text="Founder Clubs" />
            <Tag text="Accelerators" />
            <Tag text="Alumni Programs" />
            <Tag text="Mentors" />
            <Tag text="Partners" />

         </div>
        </div>
      </section>

      {/* MEMBERSHIP */}

     <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Membership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
           Apply for Membership
          </h2>

         <p className="mt-6 text-zinc-400 leading-relaxed">
         TEANET provides wallet-based memberships for founders,
         investors, mentors, partners and community participants.
         </p>
          <div className="mt-6 text-sm text-zinc-500 space-y-2">
            <div>
              ✓ Wallet required
            </div>
            <div>
             ✓ Credentials issued as SBTs
            </div>
            <div>
             ✓ Current testing phase uses Polygon Amoy
            </div>
            <div>
             ✓ No tokens or crypto investments required
            </div>
         </div>
        </div>
        <MembershipForm />

      </section>

      {/* WALLET SANDBOX */}


      <WebAccessSBT />
      {/* ===================================================== */}
      {/* ADMIN */}
      {/* ===================================================== */}

      {isConnected && isAdmin && (

        <div className="max-w-6xl mx-auto px-6 py-10">

          <AdminSBTManager />

        </div>

      )}

    </div>
  )
}

/* ===================================================== */
/* COMPONENTS */
/* ===================================================== */

function FeatureCard({ title, text }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <div className="text-lg font-semibold">
        {title}
      </div>

      <div className="mt-3 text-sm text-zinc-500 leading-relaxed">
        {text}
      </div>

    </div>
  )
}

function Tag({ text }) {
  return (
    <div className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300">
      {text}
    </div>
  )
}
