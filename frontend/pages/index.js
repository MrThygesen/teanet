'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'

import AdminSBTManager from '../components/AdminSBTManager'
import MembershipForm from '../components/MembershipForm'
import Header from '../components/Header'


const spotlightItems = [

  {
    title: 'Founders',
    subtitle: 'Who Shapes The Future',
    description:
      'Founders and startup teams building the next generation of companies.',
    image: 
      '/images/founders.jpg'
  },

  {
    title: 'Builders',
    subtitle: 'Technical Minds',
    description:
      'Developers, makers and product people turning ideas into reality.',
    image:
      '/images/builders.jpg'
  },

  {
title: 'Investors',
subtitle: 'Invest. Mentor. Connect.',
description:
'Experienced investors, angel investors and operators who actively support founders through capital, mentorship and strategic relationships.',
    image:
     '/images/investors.jpg'
  },

  {
    title: 'Specialists',
    subtitle: 'Experts & Advisors',
    description:
    'Experts, advisors and specialists supporting emerging teams and innovation.',
    image:
      '/images/specialists.jpg'
  }


]

export default function Home() {

const { isConnected, address } = useAccount()

const isAdmin =
  address?.toLowerCase() ===
  process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

const [activeSpotlight, setActiveSpotlight] = useState(0)

const [communityStats, setCommunityStats] = useState({
  members: 0,
  founders: 0,
  builders: 0,
  angels: 0,
  partners: 0,
  approvalRate: 0
})
  
useEffect(() => {

  async function loadStats() {

    try {

      const res = await fetch('/api/community/stats')

      const data = await res.json()

      setCommunityStats(data)

    } catch (err) {

      console.error(err)

    }

  }

  loadStats()

}, [])


  const spotlight = spotlightItems[activeSpotlight]

return (
  <>
 <Head>
  <title>EDGE Spaces | The Community Behind Innovation</title>

  <meta
    name="description"
    content="A trusted community where founders, builders, specialists and active investors collaborate to build better products, stronger companies and lasting professional relationships."
  />

  <meta
    property="og:title"
    content="The Community Behind Innovation"
  />

  <meta
    property="og:description"
    content="A trusted community where founders, builders, specialists and active investors collaborate to build better products, stronger companies and lasting professional relationships."
  />

  <meta
    property="og:image"
    content="https://edgespaces.xyz/images/community-preview.jpg"
  />

  <meta
    property="og:url"
    content="https://edgespaces.xyz/"
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:site_name"
    content="EDGE Spaces"
  />

  <meta
    property="og:locale"
    content="en_US"
  />

  <link
    rel="canonical"
    href="https://edgespaces.xyz/"
  />
</Head>

<div className="bg-black text-white min-h-dvh">

  <Header />

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        <div className="max-w-5xl">

         <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
  Explore EDGE Spaces
</div>

<h2 className="text-3xl md:text-4xl font-bold mb-6">
  A Trusted Startup Community That Builds Together
</h2>

<p className="mt-8 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
A trusted startup community where founders, builders, specialists and active investors solve challenges, build better products, grow stronger companies and create lasting professional relationships.
</p>
        </div>

        {/* WHO WE SUPPORT */}

        <div className="grid md:grid-cols-4 gap-5 mt-14">

<FeatureCard
 count={communityStats.founders}
  title="Founders"
  text="Entrepreneurs building startups and new ventures."
/>

<FeatureCard
 count={communityStats.builders}
  title="Builders"
  text="Developers, technical minds and product people."
/>

<FeatureCard
 count={communityStats.angels}
  title="Active Investors"
text="Experienced investors who actively support founders through capital, mentorship and strategic relationships."
/>




 <FeatureCard
   count={communityStats.specialists}
   title="Specialists"
  text="Experienced advisors, domain experts and operators helping founders and builders succeed."
 />
        </div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

  <StatCard
    value={communityStats.members}
    label="Members"
  />

  <StatCard
    value={`${communityStats.approvalRate}%`}
    label="Approval Rate"
  />

  <StatCard
    value="Manual"
    label="Application Review"
  />

  <StatCard
    value="Private"
    label="Telegram Community"
  />

</div>

      </section>

      {/* COMMUNITIES */}

      <section
        id="communities"
        className="max-w-6xl mx-auto px-6 py-10 md:py-16 border-t border-zinc-800"
      >

<div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-8">
Who's Inside EDGE Spaces
</div>

{/* SPOTLIGHT CARD */}

<div className="w-full max-w-5xl">

  <a
    href="#apply"
    className="block group cursor-pointer"
  >

    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 transition-all duration-300 group-hover:border-zinc-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20">

    <img
  src={spotlight.image}
  alt={spotlight.title}
  className="block w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
/>


    </div>

  </a>


{/* MOBILE CONTROLS */}

{/* NAVIGATION */}

<div className="flex items-center justify-between mt-8">

  <button
    onClick={() =>
      setActiveSpotlight(
        activeSpotlight === 0
          ? spotlightItems.length - 1
          : activeSpotlight - 1
      )
    }
    className="px-4 py-2 rounded-xl border border-zinc-600 hover:border-zinc-500 transition"
  >
    ← Previous
  </button>

  <button
    onClick={() =>
      setActiveSpotlight(
        (activeSpotlight + 1) % spotlightItems.length
      )
    }
    className="px-4 py-2 rounded-xl border border-zinc-600 hover:border-zinc-500 transition"
  >
    Next →
  </button>

</div>

</div>

{/* PERSONA NAVIGATION */}

<div className="hidden md:flex justify-center gap-3 mt-8">

  {spotlightItems.map((item, index) => (

    <button
      key={index}
      onClick={() => setActiveSpotlight(index)}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
        activeSpotlight === index
          ? 'border-blue-500 bg-zinc-900 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
          : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
      }`}
    >
      {item.title}
    </button>

  ))}

</div>



</section>

      {/* INSIGHTS */}

      <section
        id="insights"
        className="max-w-6xl mx-auto px-6 py-10 md:py-16 border-t border-zinc-800"
      >

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Insights & Opportunities
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          How Members Participate
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-12">
 EDGE Spaces is built around contribution. Members discover opportunities to collaborate, learn, support others and grow through the community.
        </p>

        <div className="grid md:grid-cols-4 gap-6">

          <FeatureCard
            title="🤝 Find Your Team"
            text="Meet founders, builders and specialists looking for collaborators, co-founders and early contributors."
          />

          <FeatureCard
            title="💡 Advisory & Knowledge"
            text="Share expertise, ask for feedback and connect with experienced founders, operators and specialists."
          />

          <FeatureCard
            title="🚀 Programs & Selection"
            text="Discover accelerators, hackathons, venture builders and curated cohorts. Community participation may open doors to future opportunities."
          />

          <FeatureCard
            title="🌐 Digital Membership"
            text="Your EDGE Spaces Membership Card unlocks identity, participation and an expanding range of community and partner benefits as the ecosystem evolves."
          />

        </div>

      </section>

{/* INSIDE THE COMMUNITY */}

<section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800">

  <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
    Inside the Community
  </div>

  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Designed for Meaningful Participation
  </h2>

  <p className="text-zinc-400 max-w-3xl leading-relaxed mb-12">
    EDGE Spaces is a curated innovation community where founders,
    builders, specialists and active investors collaborate around real
    opportunities—not endless conversations.
  </p>

  <div className="grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT */}

    <div className="space-y-4 text-zinc-300 leading-relaxed">

      <div>✓ Structured discussion topics</div>

      <div>✓ Founder & startup introductions</div>

      <div>✓ Technical collaboration</div>

      <div>✓ Investor & funding opportunities</div>

      <div>✓ Grants & accelerator programs</div>

      <div>✓ Partnerships & ecosystem connections</div>

      <div>✓ Events & hackathons</div>

      <div>✓ AI, Web3 and emerging technology discussions</div>

      <div>✓ Curated community with manual approval</div>

    </div>

    {/* RIGHT */}

    <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
      <img
        src="/images/community-preview.jpg"
        alt="EDGE Spaces Telegram Community"
        className="w-full"
      />
    </div>

  </div>

</section>



      {/* MEMBERSHIP */}

      <section
        id="apply"
        className="max-w-6xl mx-auto px-6 py-10 md:py-16 border-t border-zinc-800"
      >

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Membership
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Become a member
        </h2>

  <p className="text-zinc-400 max-w-3xl mb-12">

Join the EDGE Spaces community.

Apply to join a curated startup community built for founders, builders, specialists and active investors.
</p>

<div className="max-w-4xl">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

    <div className="text-xl md:text-2xl font-semibold mb-6">
      EDGE Spaces Membership
    </div>

    <p className="text-zinc-400 leading-relaxed mb-8">

   Membership includes access to the private EDGE Spaces member community on Telegram.

Telegram is free to use and creating an account takes about one minute.

<br />

    </p>

<div className="space-y-3 text-zinc-300">

  <div>✓ Access to the private EDGE Spaces community</div>

  <div>✓ Membership by application</div>

  <div>✓ Founder, builder and investor connections</div>

  <div>✓ Curated introductions and collaboration opportunities</div>

  <div✓ Optional Digital Membership with future community and partner benefits</div>



</div>

<div className="mt-8 border-t border-zinc-800 pt-6">

  <div className="text-sm uppercase tracking-wide text-blue-400 mb-3">
    Next Steps
  </div>

  <div className="space-y-2 text-zinc-400">

    <div>1. Apply and receive membership approval.</div>

    <div>2. Join the private EDGE Spaces Telegram community.</div>

    <div>3. Sign in to your <a href="/profile" className="text-blue-400 hover:text-blue-300">Profile</a> to claim your EDGE Membership.</div>

  </div>

</div>
    <a
      href="/community-card"
      className="inline-block mt-8 text-blue-400 hover:text-blue-300"
    >
      Learn more about EDGE Membership →
    </a>

  </div>

</div>


      </section>



      {/* APPLICATION FORM */}

      <div className="max-w-6xl mx-auto">

        <MembershipForm />

      </div>


      {/* ADMIN */}

      {isConnected && isAdmin && (

        <div className="max-w-6xl mx-auto px-6 py-10">

          <AdminSBTManager />

        </div>

      )}


{/* FOOTER */}

<footer className="border-t border-zinc-800 py-12 mt-20">

  <div className="max-w-6xl mx-auto px-6">

    <div className="flex flex-col md:flex-row md:justify-between gap-10">

      {/* Left */}

<div className="rounded-2xl bg-zinc-900 px-6 py-6 max-w-md border border-zinc-800 shadow-[0_0_30px_rgba(59,130,246,0.12)]">

  <div className="text-blue-400 font-semibold text-lg">
    EDGE SPACES
  </div>

  <div className="text-zinc-500 text-sm mt-1">
    Part of EDGE Alliance
  </div>

  <div className="mt-6 text-zinc-200 leading-relaxed">
    A trusted community connecting founders, builders, advisors and active investors..
  </div>


  <div className="mt-6 text-sm font-semibold tracking-wider uppercase text-blue-300">
    AI • Web3 • Emerging Technologies
  </div>

</div>

      {/* Right */}

<div className="grid md:grid-cols-2 gap-10 text-sm">

  <div>
    <div className="text-white font-semibold mb-4">
      Navigation
    </div>

    <div className="flex flex-col gap-2">
      <a href="/" className="text-zinc-400 hover:text-white transition">Home</a>
      <a href="/#communities" className="text-zinc-400 hover:text-white transition">Community</a>
      <a href="/#apply" className="text-zinc-400 hover:text-white transition">Apply</a>
      <a href="/community-card" className="text-zinc-400 hover:text-white transition">Digital Card</a>
      <a href="/profile" className="text-zinc-400 hover:text-white transition">Profile</a>
    </div>
  </div>

  <div>
    <div className="text-white font-semibold mb-4">
      Resources
    </div>

    <div className="flex flex-col gap-2">
      <a href="/contact" className="text-zinc-400 hover:text-white transition">Contact</a>
      <a href="/privacy" className="text-zinc-400 hover:text-white transition">Privacy</a>
    </div>

  </div>
</div>
</div>


    <div className="border-t border-zinc-800 mt-10 pt-6 text-xs text-zinc-600">
      © 2026 EDGE Spaces. All rights reserved.
    </div>

  </div>

</footer>

    </div>
  </>
)
}

/* ===================================================== */
/* COMPONENTS */
/* ===================================================== */

function FeatureCard({ title, text, count }) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

{count > 0 && (
  <div className="text-3xl font-bold text-blue-400 mb-3">
    {count}
  </div>
)}

      <div className="text-lg font-semibold">
        {title}
      </div>

      <div className="mt-3 text-sm text-zinc-500 leading-relaxed">
        {text}
      </div>

    </div>

  )

}

function StatCard({ value, label }) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">

      <div className="text-3xl font-bold text-blue-400">
        {value}
      </div>

      <div className="mt-2 text-sm uppercase tracking-wide text-zinc-500">
        {label}
      </div>

    </div>
  )
}
