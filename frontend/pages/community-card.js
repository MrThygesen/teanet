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
            EDGE Spaces Digital Membership
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">
            Every approved EDGE Spaces member can claim an official blockchain
            membership credential on Polygon Mainnet.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
            A wallet is completely optional when joining the community.
            Members can always connect a Polygon-compatible wallet later and
            claim their credential directly from their profile with a single click.
          </p>

        </div>

      </section>


      {/* MEMBERSHIP CARD */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="flex justify-center">

          <img
            src="/data/example-membership-card.jpg"
            alt="EDGE Spaces Digital Membership"
            className="w-full max-w-lg rounded-3xl border border-zinc-800"
          />

        </div>

        <div className="max-w-3xl mx-auto text-center mt-10">

          <p className="text-lg text-zinc-400 leading-relaxed">

           Your Digital Membership is a permanent blockchain credential proving your verified membership within the EDGE Spaces innovation ecosystem.

          </p>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Benefits
        </div>

        <h2 className="text-4xl font-bold mb-10">
          More Than An NFT
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <BenefitCard
            title="Verified Digital Identity"
            text="A permanent blockchain credential proving your verified EDGE Spaces membership."
          />

          <BenefitCard
            title="Partner Ecosystem"
            text="Access future partner benefits, ecosystem initiatives, events and exclusive opportunities."
          />

          <BenefitCard
            title="Governance Ready"
            text="Prepared for future governance participation, voting rights and community initiatives."
          />

        </div>

      </section>


      {/* CLAIM */}

      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Claim Your Credential
          </div>

          <h2 className="text-3xl font-bold mb-5">
            Simple, Fast & Low Cost
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Once your membership has been approved, simply connect a
            Polygon-compatible wallet and claim your Digital Membership directly
            from your profile.

            <br /><br />

            Credentials are issued on Polygon Mainnet, making the minting
            transaction extremely inexpensive while providing permanent
            blockchain verification.

          </p>

          <div className="mt-8 space-y-3 text-zinc-300">

            <div>✓ Wallet is optional</div>
            <div>✓ One-click claim after approval</div>
            <div>✓ Polygon Mainnet credential</div>
            <div>✓ Compatible with MetaMask, Rainbow, Rabby and other EVM wallets</div>
            <div>✓ Future governance and partner benefits</div>

          </div>

          <a
            href="/wallet-setup"
            className="inline-flex items-center justify-center mt-10 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Wallet Setup →
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
