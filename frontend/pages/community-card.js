'use client'

import WebAccessSBT from '../components/WebAccessSBT'

export default function CommunityCard() {
  return (
    <div className="bg-black text-white min-h-dvh">

      {/* HERO */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Optional Wallet Membership
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Digital Membership Card
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Digital membership is an optional feature available to approved
            EDGE Spaces members.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Join the community first. You can add a wallet address during
            your application or at any time afterwards.

          </p>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Why Add A Wallet?
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Optional Member Benefits
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Card
            title="Digital Member Card"
            text="Receive a blockchain-based EDGE Spaces membership card."
          />

          <Card
            title="Future Governance"
            text="Participate in future voting and community initiatives."
          />

          <Card
            title="Partner Benefits"
            text="Access future offers and benefits from ecosystem partners."
          />

          <Card
            title="Future Features"
            text="Unlock new member functionality as the ecosystem evolves."
          />

        </div>

      </section>


      {/* WALLET SETUP */}

      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Wallet Setup
          </div>

          <h2 className="text-3xl font-bold mb-5">
            Connect Whenever You're Ready
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Wallet membership is completely optional. If you decide to
            receive a digital membership card, simply connect a wallet.

          </p>

          <p className="text-zinc-500 mt-5 leading-relaxed">

            A demo card can be issued first to verify your wallet before
            your official membership card is delivered.

          </p>

          <a
            href="/wallet-setup"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            Open Wallet Setup →
          </a>

        </div>

      </section>


      {/* WEB3 COMPONENT */}

      <section className="border-t border-zinc-800">

        <WebAccessSBT />

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


function Card({ title, text }) {

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
