'use client'

import Header from '../components/Header'

export default function CommunityCard() {
  return (
    <div className="bg-black text-white min-h-dvh">

      <Header />

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
Digital Membership
          </div>



          <h1 className="text-5xl font-bold leading-tight">
           Your Digital Membership in EDGE Spaces
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">
            Your Digital Membership is your membership credential within the
            EDGE Spaces innovation network.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
            It confirms your membership today while becoming the foundation
            for future ecosystem initiatives, partner collaborations,
            digital collections and community participation.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
            A blockchain wallet is completely optional.
            Members can connect a Polygon-compatible wallet at any time
            and claim their Digital Membership directly from their profile
            after approval.
          </p>

        </div>

      </section>

      {/* ===================================================== */}
      {/* DIGITAL MEMBERSHIP */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="flex justify-center">

          <img
            src="/data/example-membership-card.jpg"
            alt="EDGE Spaces Digital Membership"
            className="w-full max-w-lg rounded-3xl border border-zinc-800"
          />

        </div>

        <div className="max-w-3xl mx-auto text-center mt-10">

          <h2 className="text-3xl font-bold mb-6">
           Your Community Membership
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
           Your Digital Membership is a blockchain membership credential
issued by EDGE Spaces.

It confirms that this wallet has been issued a valid
EDGE Spaces membership.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
            Unlike traditional memberships, your credential belongs to you.
            It remains in your own wallet while still being recognised by
            the EDGE Spaces platform and compatible Polygon wallets.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
Today it represents your membership.
Over time it can become the foundation for additional
community participation, digital collections and
ecosystem experiences.

          </p>

        </div>

      </section>


      {/* ===================================================== */}
      {/* YOUR DIGITAL Membership */}
      {/* ===================================================== */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

     <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
  Beyond Membership
</div>

        <h2 className="text-4xl font-bold mb-6">
          More Than Membership
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-12 leading-relaxed">
          Your Digital Membership is only the beginning.
          As EDGE Spaces evolves, your membership credential can
          unlock new experiences, partner initiatives, digital
          collections and community participation.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <BenefitCard
           title="Community Membership"
           text="A blockchain membership credential issued by EDGE Spaces."
          />

          <BenefitCard
            title="Partner Benefits"
            text="Access future partner initiatives, ecosystem opportunities and exclusive member experiences."
          />

          <BenefitCard
            title="EDGE Collection"
            text="Mint curated digital editions sponsored by companies and ecosystem partners while supporting artists and the community."
          />

          <BenefitCard
            title="Event Collectibles"
            text="Collect limited digital editions from conferences, demo days, hackathons and community events."
          />

          <BenefitCard
            title="Community Recognition"
            text="Receive digital achievements recognising mentoring, collaboration and meaningful ecosystem contributions."
          />

          <BenefitCard
            title="Governance Ready"
            text="Prepared for future community participation, voting and ecosystem governance."
          />

        </div>

      </section>

      {/* ===================================================== */}
      {/* WHY BLOCKCHAIN */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Why Blockchain?
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Real Ownership
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Traditional communities store memberships inside their own
          systems.
        </p>

        <p className="mt-6 text-zinc-400 leading-relaxed">
          EDGE Spaces allows members to own their membership
          credential.....
        </p>

        <p className="mt-6 text-zinc-500 leading-relaxed">
          We believe the card can be applied for future services and   
        </p>

      </section>

      {/* ===================================================== */}
      {/* FUTURE ECOSYSTEM */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Future Ecosystem
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Growing With The Community
        </h2>

        <p className="text-zinc-400 leading-relaxed max-w-3xl">
          As the EDGE Spaces innovation network grows,
we plan to introduce additional benefits built
around your Digital Membership, including partner
initiatives, digital collections, community
recognition and future participation features.


        </p>

        <div className="mt-10 space-y-4 text-zinc-300">

          <div>✓ Sponsored digital collections</div>

          <div>✓ EDGE Collection member editions</div>

          <div>✓ Partner campaigns and rewards</div>

          <div>✓ Founder and contributor recognition</div>

          <div>✓ Community achievements</div>

          <div>✓ Future governance participation</div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* TAKE THE NEXT STEP */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Join the Innovation Network
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Start Your Digital Membership
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-400 leading-relaxed">
     Whether you're joining EDGE Spaces for the first time or you're already an approved member,
your Digital Membership gives you access to future participation across the EDGE Spaces innovation network.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">

            <div className="bg-black border border-zinc-800 rounded-2xl p-8">

              <div className="text-xl font-semibold mb-4">
                New to EDGE Spaces?
              </div>

              <p className="text-zinc-400 leading-relaxed">
                Apply to join our curated innovation network and connect with
                founders, builders, investors, advisors and ecosystem partners.
              </p>

              <a
                href="/membership"
                className="inline-flex mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                Apply for Membership
              </a>

            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-8">

              <div className="text-xl font-semibold mb-4">
                Already a Member?
              </div>

              <p className="text-zinc-400 leading-relaxed">
                Connect your Polygon-compatible wallet and claim your Digital
                Membership from your profile. Your wallet remains optional until
                you're ready.
              </p>

              <a
                href="/wallet-setup"
                className="inline-flex mt-8 px-6 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition font-semibold"
              >
                Claim Digital Membership
              </a>

            </div>

          </div>

          <div className="mt-12 text-zinc-500 text-sm">
            Digital Membership • EDGE Collection • Partner Benefits • Community Recognition
          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="border-t border-zinc-800 py-12">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-blue-400 font-semibold text-lg">
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

/* ===================================================== */
/* BENEFIT CARD */
/* ===================================================== */

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


