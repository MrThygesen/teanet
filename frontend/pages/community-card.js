'use client'

export default function CommunityCard() {
  return (
    <div className="bg-black text-white min-h-dvh">

      {/* HERO */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Optional Digital Membership
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Digital Membership Card
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Every approved EDGE Spaces member can optionally receive a
            blockchain-based Digital Membership Card.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Joining the community does not require a wallet.
            You can connect one during your application or at any time later.

          </p>

        </div>

      </section>


      {/* EXAMPLE CARD */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Example
        </div>

        <h2 className="text-4xl font-bold mb-8">
          Example Membership Card
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-12">

          This is an example of the EDGE Spaces Digital Membership Card.

          <br /><br />

          Every approved member receives a personalized digital card.
          Additional community-specific cards may be introduced as the
          ecosystem grows.

        </p>

        <div className="flex justify-center">

          <img
            src="/data/example-membership-card.jpg"
            alt="Example EDGE Spaces Digital Membership Card"
            className="w-full max-w-lg rounded-3xl border border-zinc-800"
          />

        </div>

      </section>


      {/* BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Benefits
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Why Have A Digital Membership Card?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card
            title="Digital Identity"
            text="A blockchain-based proof of your EDGE Spaces membership."
          />

          <Card
            title="Partner Benefits"
            text="Future access to partner offers and ecosystem initiatives."
          />

          <Card
            title="Future Governance"
            text="Participate in future community voting and governance."
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

            Wallet setup is completely optional.

            <br /><br />

            If you'd like a Digital Membership Card,
            simply connect a compatible wallet.

          </p>

          <p className="text-zinc-500 mt-6 leading-relaxed">

            A demo card can be issued first to verify that your wallet
            is configured correctly before your official membership card
            is delivered.

          </p>

          <a
            href="/wallet-setup"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
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
