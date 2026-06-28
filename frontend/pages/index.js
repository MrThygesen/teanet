'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
      'https://raw.githubusercontent.com/MrThygesen/teanet/main/data/founders.jpg'
  },

  {
    title: 'Builders',
    subtitle: 'Technical Minds',
    description:
      'Developers, makers and product people turning ideas into reality.',
    image:
      'https://raw.githubusercontent.com/MrThygesen/teanet/main/data/builders.jpg'
  },

  {
    title: 'Business Angels',
    subtitle: 'Support The Ecosystem',
    description:
'Business angels and experienced operators supporting founders through relationships, mentorship and opportunities.',
    image:
      'https://raw.githubusercontent.com/MrThygesen/teanet/main/data/business-angels.jpg'
  },

  {
    title: 'Ecosystem Partners',
    subtitle: 'Organizations',
  description:
'Accelerators, venture builders and organizations helping founders and builders grow.',
    image:
      'https://raw.githubusercontent.com/MrThygesen/teanet/main/data/ecosystem-partners.jpg'
  },

  {
    title: 'Ecosystem Specialists',
    subtitle: 'Experts & Advisors',
    description:
    'Experts, advisors and specialists supporting emerging teams and innovation.',
    image:
      'https://raw.githubusercontent.com/MrThygesen/teanet/main/data/ecosystem-supporters.jpg'
  }

]

export default function Home() {

  const { isConnected, address } = useAccount()

  const isAdmin =
    address?.toLowerCase() ===
    process.env.NEXT_PUBLIC_ADMIN?.toLowerCase()

  const [activeSpotlight, setActiveSpotlight] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveSpotlight(prev =>
        (prev + 1) % spotlightItems.length
      )

    }, 5000)

    return () => clearInterval(interval)

  }, [])

  const spotlight = spotlightItems[activeSpotlight]

  return (
<div className="bg-black text-white min-h-dvh">

<Header />
   
      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        <div className="max-w-5xl">

         <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
  Explore EDGE Spaces
</div>

<h2 className="text-3xl md:text-4xl font-bold mb-6">
  Who Shapes The Future
</h2>
          <p className="mt-8 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">

           EDGE Spaces brings together founders, builders, business angels and ecosystem partners and specialists.

          </p>

        </div>

        {/* WHO WE SUPPORT */}

        <div className="grid md:grid-cols-4 gap-5 mt-14">

<FeatureCard
  title="Founders"
  text="Entrepreneurs building startups and new ventures."
/>

<FeatureCard
  title="Builders"
  text="Developers, technical minds and product people."
/>

<FeatureCard
  title="Business Angels"
  text="Supporting founders through relationships and experience."
/>

<FeatureCard
  title="Ecosystem Partners"
  text="Accelerators, venture builders and innovation organizations."
/>

        </div>

      </section>

      {/* COMMUNITIES */}

      <section
        id="communities"
        className="max-w-6xl mx-auto px-6 py-10 md:py-16 border-t border-zinc-800"
      >

<div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-8">
  Community Preview
</div>

{/* SPOTLIGHT CARD */}

<div className="w-full max-w-5xl">

  <a
    href="#membership"
    className="block group cursor-pointer"
  >

    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20">

      <img
        src={spotlight.image}
        alt={spotlight.title}
        className="block w-full aspect-square object-contain bg-zinc-900 transition-transform duration-300 group-hover:scale-[1.01]"
      />

    </div>

  </a>

  {/* CARD PREVIEW ROW */}

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">

    {spotlightItems.map((item, index) => (

      <div
        key={index}
        onClick={() => setActiveSpotlight(index)}
        className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
          activeSpotlight === index
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-zinc-800 opacity-60 hover:opacity-100'
        }`}
      >

        <img
          src={item.image}
          alt={item.title}
          className="block w-full h-28 object-cover"
        />

      </div>

    ))}

  </div>
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
          What's Happening
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-12">
          Community updates, partner opportunities and emerging initiatives.
        </p>

        <div className="grid md:grid-cols-4 gap-6">

          <FeatureCard
            title="Builders Wanted"
            text="Founders searching for technical collaborators and early contributors."
          />

          <FeatureCard
            title="Accelerator Applications"
            text="Partner programs and upcoming cohorts."
          />

          <FeatureCard
            title="Investor Interest"
            text="Themes and sectors currently attracting attention."
          />

          <FeatureCard
            title="Workspace Opportunities"
            text="Shared offices, local communities and partner benefits."
          />

        </div>

      </section>


      {/* MEMBERSHIP */}

      <section
        id="membership"
        className="max-w-6xl mx-auto px-6 py-10 md:py-16 border-t border-zinc-800"
      >

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Membership
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Become a member
        </h2>

  <p className="text-zinc-400 max-w-3xl mb-12">

Join the private EDGE Spaces community.

Applications are reviewed manually to maintain
a high-quality network.

</p>


<div className="max-w-4xl">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

    <div className="text-xl md:text-2xl font-semibold mb-6">
      EDGE Spaces Membership
    </div>

    <p className="text-zinc-400 leading-relaxed mb-8">

   Membership includes access to the private EDGE Spaces Telegram community.

Telegram is free to use and creating an account takes about one minute.

<br />

    </p>

    <div className="space-y-4 text-zinc-300">

<div> ✓ Private Telegram community </div>
<div> ✓ Manual application review </div>
<div> ✓ Telegram account required (free) </div>
<div> ✓ Founder, builder and investor introductions </div>
<div> ✓ Hackathons and ecosystem events </div>
<div> ✓ Optional Digital Membership Card with future benefits </div>

    </div>

    <a
      href="/community-card"
      className="inline-block mt-8 text-blue-400 hover:text-blue-300"
    >
      Learn about Membership Card →
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

          <div className="text-blue-400 font-semibold">
            EDGE SPACES
          </div>

          <div className="text-zinc-500 mt-2 text-sm">
            Part of EDGE Alliance
          </div>

          <div className="text-zinc-600 text-sm mt-6">
            Founders • Builders • Business Angels • Ecosystem Partners
          </div>

<div className="text-zinc-600 text-sm mt-2">
  AI • Web3 • Emerging Technologies
</div>


        </div>

      </footer>

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

