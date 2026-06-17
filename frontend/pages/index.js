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
  Decentralized Communities • Part of EDGE Alliance
</div>

          </div>

        <div className="flex items-center gap-8">

  <a
    href="#communities"
    className="text-sm text-zinc-400 hover:text-white"
  >
    Communities
  </a>

  <a
    href="#membership"
    className="text-sm text-zinc-400 hover:text-white"
  >
    Membership
  </a>

  <a
    href="#sandbox"
    className="text-sm text-zinc-400 hover:text-white"
  >
    Sandbox
  </a>

  <ConnectButton />

</div>

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
           Join the Club.
            <br />
Engage in defining the technologies of 2026+
          </h1>

          <p className="mt-6 text-xl text-zinc-400 leading-relaxed">
            TEANET helps founders, investors and developers coordinate around new ideas, projects and emerging technologies.
          </p>

        </div>

        {/* ===================================================== */}
        {/* FEATURE CARDS */}
        {/* ===================================================== */}

        <div className="grid md:grid-cols-3 gap-5 mt-14">

<FeatureCard
  title="Founder Communities"
  text="Build new ventures together, validate ideas and connect with other builders."
/>

<FeatureCard
  title="Investor Networks"
  text="Discover projects earlier and support founders through collaboration and introductions."
/>

<FeatureCard
  title="Developer Communities"
  text="Experiment with AI, wallet identity and emerging technologies."
/>

        </div>

        {/* ===================================================== */}
        {/* COMMUNITIES */}
        {/* ===================================================== */}

        <div
  id="communities"
  className="mt-16 border-t border-zinc-800 pt-10"
>

          <div className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
            Communities
          </div>

          <div className="flex flex-wrap gap-3">

       <Tag text="Founder Clubs" />
<Tag text="Investor Networks" />
<Tag text="Developer Communities" />
<Tag text="Mentors" />
<Tag text="Partners" />
<Tag text="Accelerators" />
<Tag text="Innovation Programs" />


         </div>
        </div>
      </section>

<section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

<div className="max-w-3xl">

<div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
Roadmap
</div>

<h2 className="text-4xl font-bold mb-6">
From Ideas to Teams
</h2>

<p className="text-zinc-400 leading-relaxed">
TEANET is evolving from identity and membership infrastructure toward collaboration spaces where founders, investors and developers can coordinate around new initiatives.
</p>

</div>

<div className="grid md:grid-cols-5 gap-6 mt-12">

<FeatureCard title="Identity ✓" text="Portable credentials." />

<FeatureCard title="Membership ✓" text="Community onboarding." />

<FeatureCard title="Collaboration" text="Connect builders and supporters." />

<FeatureCard title="Project Rooms" text="Dedicated spaces for new ideas." />

<FeatureCard title="Governance" text="Future voting and approvals." />

</div>

</section>


<section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

<div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
  How Membership Works
</div>

<h2 className="text-4xl font-bold mb-4">
  Get Started Here
</h2>

<p className="text-zinc-400 mb-10">
  Choose how you want to participate.
</p>

<div className="grid md:grid-cols-4 gap-6">

 <FeatureCard
  title="1. Choose Access"
  text="Join with a wallet for future voting rights or simply apply with email."
/>

<FeatureCard
  title="2. Apply"
  text="Choose the community you want to join and submit your request."
/>

<FeatureCard
  title="3. Review"
  text="Applications are reviewed manually."
/>

<FeatureCard
  title="4. Join Community"
  text="Approved members receive either an email confirmation or a wallet credential."
/>

<div className="grid md:grid-cols-2 gap-6 mt-12">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

    <div className="text-sm uppercase tracking-wide text-blue-400 mb-3">
      Community Membership
    </div>

    <h3 className="text-2xl font-bold mb-4">
      Apply for Membership
    </h3>

    <p className="text-zinc-400 mb-6">
      Join founder, investor and developer communities using either email or a wallet.
    </p>

    <a
      href="#membership"
      className="inline-block px-5 py-3 rounded bg-blue-600 hover:bg-blue-700"
    >
      Open Application
    </a>

  </div>


  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

    <div className="text-sm uppercase tracking-wide text-blue-400 mb-3">
      Wallet Sandbox
    </div>

    <h3 className="text-2xl font-bold mb-4">
      Test Wallet Connection
    </h3>

    <p className="text-zinc-400 mb-6">
      Experiment with Polygon Amoy and test membership cards. Optional for wallet users.
    </p>

    <a
      href="#sandbox"
      className="inline-block px-5 py-3 rounded bg-zinc-800 hover:bg-zinc-700"
    >
      Open Sandbox
    </a>

  </div>

</div>

</div>
</section>


      {/* MEMBERSHIP */}

     <section
  id="membership"
  className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800"
>
        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Membership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
           Apply for Membership
          </h2>

         <p className="mt-6 text-zinc-400 leading-relaxed">
         Join communities exploring new technologies,
investment ecosystems and future collaboration models.
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


<section id="sandbox">

  <WebAccessSBT />

</section>
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
