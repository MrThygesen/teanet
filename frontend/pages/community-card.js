
'use client'

import Header from '../components/Header'


export default function CommunityCard() {
  return (
    <div className="bg-black text-white min-h-dvh">

 <Header />


      {/* HERO */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Digital Membership
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Digital Membership Card
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">
            Every approved EDGE Spaces member can optionally receive a
            Digital Membership Card in their wallet (metamask or similar).
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
            You can connect one during
            your application or at any time afterwards. This is not mandatory, and is a feature mainly for web3 users that want governance access- and future benefits. 
          </p>

        </div>

      </section>


      {/* MEMBERSHIP CARD */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="flex justify-center">

          <img
            src="/data/example-membership-card.jpg"
            alt="EDGE Spaces Digital Membership Card"
            className="w-full max-w-lg rounded-3xl border border-zinc-800"
          />

        </div>

        <div className="max-w-3xl mx-auto text-center mt-10">

          <p className="text-lg text-zinc-400 leading-relaxed">

            Your Digital Membership Card serves as blockchain-based proof of
            your EDGE Spaces membership.

          </p>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Future Benefits
        </div>

        <h2 className="text-4xl font-bold mb-10">
          More Than A Membership Card
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <BenefitCard
            title="Digital Identity"
            text="A permanent blockchain-based proof of your EDGE Spaces membership."
          />

          <BenefitCard
            title="Partner Benefits"
            text="Future offers, events and ecosystem initiatives from approved partners."
          />

          <BenefitCard
            title="Community Governance"
            text="Future participation in voting and community-led initiatives."
          />

        </div>

      </section>


      {/* WALLET */}

      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Wallet Setup
          </div>

          <h2 className="text-3xl font-bold mb-5">
            Connect A Wallet Whenever You're Ready
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Connecting a wallet is completely optional.

            <br /><br />

            If you'd like a Digital Membership Card, simply connect a
            compatible wallet during your application or afterwards.

          </p>

          <div className="mt-8 space-y-3 text-zinc-300">

            <div>✓ Wallet is optional</div>
            <div>✓ Compatible with common EVM wallets</div>
            <div>✓ Demo card available for testing</div>
            <div>✓ Official membership card issued after verification</div>

          </div>

          <a
            href="/wallet-setup"
            className="inline-flex items-center justify-center mt-10 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Open Wallet Setup →
          </a>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-zinc-800 py-12">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-blue-400 font-semibold">
            EDGE SPACES
          </div>

          <div className="text-zinc-500 mt-2">
            Part of EDGE Alliance
          </div>

        </div>

      </footer>

    </div>
  )
}


function BenefitCard({ title, text }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 text-zinc-500 leading-relaxed">
        {text}
      </p>

    </div>
  )
}
