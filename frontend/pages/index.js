'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import AdminSBTManager from '../components/AdminSBTManager'
import MembershipForm from '../components/MembershipForm'

const spotlightItems = [

  {
    title: 'Founders',
    subtitle: 'Who Shapes The Future',
    description:
      'For founders and startup teams building the next generation of companies.',
    image:
      '/founders.jpg'
  },

  {
    title: 'Builders',
    subtitle: 'Technical Minds',
    description:
      'Developers, makers and product people turning ideas into reality.',
    image:
      '/builders.jpg'
  },

  {
    title: 'Business Angels',
    subtitle: 'Support The Ecosystem',
    description:
      'Experienced operators and investors supporting founders through relationships and mentorship.',
    image:
      '/business-angels.jpg'
  },

  {
    title: 'Ecosystem Partners',
    subtitle: 'Organizations',
    description:
      'Accelerators, venture builders and ecosystem organizations supporting innovation.',
    image:
      '/ecosystem-partners.jpg'
  },

  {
    title: 'Ecosystem Supporters',
    subtitle: 'Experts & Specialists',
    description:
      'Advisors, lawyers and specialists helping founders and builders grow.',
    image:
      '/ecosystem-supporters.jpg'
  }

]
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

    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}

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
              href="#insights"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Insights
            </a>

            <a
              href="/community-card"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Digital Membership
            </a>

            <a
              href="#membership"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm"
            >
              Apply Now
            </a>

            <ConnectButton />

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Part of EDGE Alliance
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build What's Next.
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-2xl">

            EDGE Spaces helps founders, builders, investors and ecosystem
            partners organise around new ideas, projects and emerging technologies.

          </p>

        </div>

        {/* WHO WE SUPPORT */}

        <div className="grid md:grid-cols-4 gap-5 mt-14">

          <FeatureCard
            title="Founder Spaces"
            text="Build ventures and find collaborators."
          />

          <FeatureCard
            title="Builder Spaces"
            text="Join projects and explore technologies."
          />

          <FeatureCard
            title="Investor Networks"
            text="Support ecosystems and discover opportunities."
          />

          <FeatureCard
            title="Ecosystem Partners"
            text="Accelerators, offices and innovation programs."
          />

        </div>

      </section>

      {/* COMMUNITIES */}

      <section
        id="communities"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800"
      >

   <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
  Explore EDGE Spaces
</div>

<h2 className="text-4xl font-bold mb-6">
  Who Shapes The Future
</h2>
      <p className="text-zinc-400 max-w-3xl mb-12">
  EDGE Spaces brings together founders, builders, business angels,
  ecosystem partners and specialists building what's next.
</p>


{/* SPOTLIGHT CARD */}

<div className="max-w-3xl">

  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-all duration-500">

    {spotlight.image && (

      <img
        src={spotlight.image}
        className="rounded-2xl mb-6 w-full h-72 object-cover"
      />

    )}

    <div className="text-xs uppercase tracking-wider text-blue-400 mb-2">
      {spotlight.subtitle}
    </div>

    <h3 className="text-3xl font-bold mb-5">
      {spotlight.title}
    </h3>

    <p className="text-zinc-400 leading-relaxed mb-8">
      {spotlight.description}
    </p>

    <a
      href="#membership"
      className="inline-block px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
    >
      Apply for Membership
    </a>

  </div>


{/* CARD PREVIEW ROW */}

<div className="grid grid-cols-4 gap-4 mt-6">

  {spotlightItems.map((item, index) => (

    <div
      key={index}
      onClick={() => setActiveSpotlight(index)}
      className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
        activeSpotlight === index
          ? 'border-blue-500 scale-105'
          : 'border-zinc-800 opacity-60'
      }`}
    >

      <img
        src={item.image}
        alt={item.title}
        className="w-full h-28 object-cover"
      />

    </div>

  ))}

</div>
</div>
</section>


 <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

   <div className="text-xl font-semibold mb-4">
    Community Access
   </div>

   <p className="text-zinc-400 leading-relaxed mb-6">
     Approved members receive access to the EDGE Spaces Telegram community.
   </p>

   <div className="space-y-3 text-zinc-400">

     <div>✓ Community discussions</div>
     <div>✓ Founder and builder introductions</div>
     <div>✓ Accelerator opportunities</div>
     <div>✓ Grants and ecosystem updates</div>
     <div>✓ Future events and collaborations</div>

   </div>

 </div>


      {/* INSIGHTS */}

      <section
        id="insights"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800"
      >

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Insights & Opportunities
        </div>

        <h2 className="text-4xl font-bold mb-6">
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
        className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800"
      >

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Membership
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Join the Network
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-12">
          Start with email membership. Add a wallet later if you want a digital member card and future community benefits.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <div className="text-xl font-semibold mb-6">
              Email Membership
            </div>

            <div className="space-y-3 text-zinc-400">

              <div>✓ Introductions</div>

              <div>✓ Community updates</div>

              <div>✓ Opportunities</div>

              <div>✓ Matchmaking support</div>

            </div>

          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <div className="text-xl font-semibold mb-6">
              Optional Wallet Membership
            </div>

            <div className="space-y-3 text-zinc-400">

              <div>✓ Digital member card</div>

              <div>✓ Future voting access</div>

              <div>✓ Partner benefits</div>

              <div>✓ Shared office perks</div>

            </div>

            <a
              href="/community-card"
              className="inline-block mt-8 text-blue-400 hover:text-blue-300"
            >
              Learn more →
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
            Founders • Builders • Investors • Ecosystem Partners
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

