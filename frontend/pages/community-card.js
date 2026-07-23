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
            Digital Membership in EDGE Spaces
          </h1>

<p className="mt-8 text-xl text-zinc-400 leading-relaxed">
  Your Digital Membership is a wallet-based digital identity that confirms your membership in the EDGE Spaces innovation ecosystem.
</p>

<p className="mt-6 text-zinc-500 leading-relaxed">
  Built on modern Web3 infrastructure, your membership is designed to grow with your participation and provide access to future community initiatives, sponsored memberships, digital collections and member services.
</p>
        </div>

      </section>


      {/* ===================================================== */}
      {/* BEYOND MEMBERSHIP */}
      {/* ===================================================== */}

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
         Growing With You
        </div>

        <h2 className="text-4xl font-bold mb-10">
          More Than Membership
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <BenefitCard
            title="Community Membership"
            text="Your permanent membership in EDGE Spaces."
          />

          <BenefitCard
            title="Sponsored Membership"
            text="Receive organization-sponsored memberships, partner benefits and ecosystem opportunities."
          />

          <BenefitCard
            title="Digital Collections"
            text="Collect exclusive community and partner collectibles connected to events, initiatives and collaborations."
          />

          <BenefitCard
            title="Member Benefits"
            text= "Access future services, partner offers, collaborations and community initiatives as the ecosystem grows."
          />

          <BenefitCard
            title="Community Recognition"
            text="Build a verifiable history of your contributions, participation and achievements."
          />

          <BenefitCard
            title="Community Participation"
            text="Participate in future community initiatives, voting and member-driven activities."
          />

        </div>

      </section>


      {/* ===================================================== */}
      {/* DIGITAL MEMBERSHIP */}
      {/* ===================================================== */}

<section className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-800">

<h2 className="text-3xl font-bold mb-6">
  Your Digital Membership
</h2>

<p className="text-lg text-zinc-400 leading-relaxed">
  This is an example of your wallet-based Digital Membership. It belongs to you and serves as your verifiable identity within the EDGE Spaces community.
</p>


  {/* Centered image */}
  <div className="flex justify-center">
    <img
      src="/data/example-membership-card.jpg"
      alt="EDGE Spaces Digital Membership"
      className="w-full max-w-lg rounded-3xl border border-zinc-800"
    />
  </div>

  {/* Text aligned with hero */}
  <div className="max-w-3xl mt-10">

<p className="mt-6 text-zinc-500 leading-relaxed">
  To claim your Digital Membership you'll need a free digital wallet that supports the Polygon network. The setup takes only a few minutes and network fees are typically only a few cents.
</p>


<div className="mt-8">
  <a
    href="/wallet-setup"
    className="inline-flex items-center px-6 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition font-semibold"
  >
    Wallet Setup and Recommended Wallets →
  </a>
</div>


  </div>

</section>



      {/* ===================================================== */}
      {/* FUTURE */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          Growing the Network
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Growing With The Community
        </h2>

        <p className="text-zinc-400 max-w-3xl leading-relaxed">
          As the EDGE Spaces evolves, your Digital Membership can grow with new community initiatives, sponsored memberships, digital collections, recognition and future member services.
        </p>

        <div className="mt-10 space-y-3 text-zinc-300">

          <div>✓ New collaboration opportunities</div>

          <div>✓ Community recognition </div>

          <div>✓ EDGE Collections</div>

          <div>✓ Future participation</div>

        </div>

      </section>




      {/* ===================================================== */}
      {/* TAKE THE NEXT STEP */}
      {/* ===================================================== */}

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Join EDGE Spaces
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Become Part of the Community
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-400 leading-relaxed">
            Join the EDGE Spaces innovation network or claim your Digital
            Membership to access future member initiatives, digital collections
            and community opportunities.
          </p>


<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <h3 className="font-semibold mb-2">
    Why a Digital Wallet?
  </h3>

  <p className="text-zinc-400 leading-relaxed">
    Unlike a traditional membership card, your Digital Membership is stored in your own wallet. This gives you ownership of your membership, a verifiable digital identity and a foundation for future community participation, achievements and sponsored member benefits.
  </p>
</div>



          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">

            <div className="bg-black border border-zinc-800 rounded-2xl p-8">

              <div className="text-xl font-semibold mb-4">
                New to EDGE Spaces?
              </div>

              <p className="text-zinc-400 leading-relaxed">
                Apply to join our curated innovation network for founders,
                builders, active angels and advisors.
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
                Connect your wallet and claim your Digital Membership.
                It only takes a few minutes.
              </p>

             <a
  href="/wallet-setup"
  className="inline-flex mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
>
  Claim Membership
</a>

            </div>

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
