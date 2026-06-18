'use client'

import WebAccessSBT from '../components/WebAccessSBT'

export default function CommunityCard() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Optional Digital Membership
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Digital Membership Cards
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Approved members who provide a wallet address may receive a
            digital membership card issued by EDGE Spaces.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Members can optionally verify their wallet setup beforehand
            using a demo card.

          </p>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Benefits
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Why Add a Wallet?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Card
            title="Digital Identity"
            text="Receive a portable community member card."
          />

          <Card
            title="Future Voting"
            text="Participate in future governance initiatives."
          />

          <Card
            title="Partner Benefits"
            text="Access opportunities from ecosystem partners."
          />

          <Card
            title="Workspace Access"
            text="Potential benefits from shared office communities."
          />

        </div>

      </section>


      {/* MEMBERSHIP PROCESS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Membership Process
        </div>

        <h2 className="text-4xl font-bold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Card
            title="1. Apply"
            text="Submit your membership request."
          />

          <Card
            title="2. Optional Wallet"
            text="Provide a wallet address if you want a digital membership card."
          />

          <Card
            title="3. Verify Wallet"
            text="Optionally receive a demo card to confirm your setup works."
          />

          <Card
            title="4. Receive Membership"
            text="EDGE Spaces issues your approved membership card."
          />

        </div>

      </section>


      {/* MEMBERSHIP TYPES */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <div className="text-2xl font-semibold mb-6">
              Email Membership
            </div>

            <div className="space-y-4 text-zinc-400">

              <div>✓ Community updates</div>

              <div>✓ Matchmaking support</div>

              <div>✓ Opportunities</div>

              <div>✓ Introductions</div>

            </div>

          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <div className="text-2xl font-semibold mb-6">
              Wallet Membership
            </div>

            <div className="space-y-4 text-zinc-400">

              <div>✓ Everything above</div>

              <div>✓ Digital membership card</div>

              <div>✓ Future voting access</div>

              <div>✓ Partner benefits</div>

            </div>

          </div>

        </div>

      </section>


      {/* COMMUNITY BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Community Benefits
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Future Ecosystem Opportunities
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Card
            title="Accelerators"
            text="Founder cohorts and member programs."
          />

          <Card
            title="Investor Networks"
            text="Sector-focused communities."
          />

          <Card
            title="Builder Clubs"
            text="Collaboration around projects."
          />

          <Card
            title="Partner Spaces"
            text="Benefits from local communities."
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
            Verify Your Wallet
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Members can optionally receive a demo card before receiving
            their official membership card.

          </p>

          <p className="text-zinc-500 mt-5 leading-relaxed">

            Receiving a demo card confirms that wallet setup is working
            correctly and that future membership cards can be delivered
            successfully.

          </p>

        </div>

      </section>


      {/* WEB3 */}

<section className="border-t border-zinc-800">

  <div className="max-w-4xl mx-auto px-6 py-16 text-center">

    <a
      href="/wallet-setup"
      className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
    >
      Open Wallet Setup →
    </a>

  </div>

</section>


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
