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
  EDGE SPACES
</div>

<div className="text-xs text-zinc-500">
  Part of EDGE Alliance
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
  Build What's Next.
</h1>

<p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-2xl">
  EDGE Spaces helps founders, investors and builders coordinate around new ideas, projects and emerging technologies.
</p>

        </div>

        {/* ===================================================== */}
        {/* FEATURE CARDS */}
        {/* ===================================================== */}

        <div className="grid md:grid-cols-3 gap-5 mt-14">

<FeatureCard
  title="Founder Spaces"
  text="Build new ventures together, validate ideas and connect with other builders."
/>

<FeatureCard
  title="Investor Spaces"
  text="Discover projects earlier and support founders through collaboration and introductions."
/>

<FeatureCard
title="Builder Spaces"
text="Experiment with AI, software and emerging technologies."
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
EDGE Spaces is evolving from identity and membership infrastructure toward collaboration spaces where founders, investors and builders can coordinate around new initiatives.
</p>

</div>

<div className="grid md:grid-cols-5 gap-6 mt-12">

<FeatureCard title="Identity ✓" text="Portable credentials." />

<FeatureCard title="Membership ✓" text="Community onboarding." />

<FeatureCard title="Collaboration" text="Connect builders and supporters." />

<FeatureCard title="Project Space" text="Dedicated spaces for new ideas." />

<FeatureCard title="Governance" text="Optional member participation." />

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
  text="Apply with email and optionally add a wallet for digital credentials and future participation rights."
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
  text="Approved members receive membership confirmation and may optionally receive a digital credential."
/>

</div>

<div className="mt-12">

  <div className="bg-blue-600 rounded-3xl p-10">

  <div className="grid md:grid-cols-4 gap-8 items-center">

    {/* LEFT */}
    <div className="md:col-span-3">

      <div className="text-sm uppercase mb-3 text-blue-100">
        Start Here
      </div>

      <h3 className="text-4xl font-bold mb-4">
        Apply for Membership
      </h3>

      <p className="text-blue-100 max-w-2xl mb-8 leading-relaxed">
        Join founder, investor and builder spaces using email or an optional wallet.
      </p>

      <a
        href="#membership"
        className="inline-block px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-zinc-100 transition"
      >
        Open Application
      </a>

    </div>

{/* RIGHT */}
<div className="flex justify-center md:justify-end">

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden max-w-xs shadow-2xl hover:scale-105 transition duration-300">

    <img
      src="/founders.jpg"
      alt="Accelerator Membership"
      className="h-40 w-full object-cover"
    />

    <div className="p-4 space-y-3">

      <span className="text-xs px-3 py-1 rounded-full bg-blue-600">
        Utility
      </span>

      <h3 className="text-lg font-semibold">
        Accelerator Membership
      </h3>

      <div className="flex flex-wrap gap-2">

        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
          Accelerator
        </span>

        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
          Forming
        </span>

        <span className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300">
          Contact Founder
        </span>

      </div>

      <p className="text-sm text-zinc-400 leading-relaxed">
        Membership credential providing access to accelerator programmes,
        founder resources and ecosystem participation.
      </p>

    </div>

  </div>

</div>


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
              ✓ Email Membership Available
            </div>
            <div>
             ✓  Wallet membership optional
            </div>
            <div>
             ✓  Future participation rights for wallet members
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
