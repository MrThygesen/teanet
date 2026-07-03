import Header from '../components/Header'

export default function Privacy() {

  return (

    <div className="bg-black text-white min-h-screen">

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold mb-8">
          Privacy Policy
        </h1>

        <p className="text-zinc-400 mb-8">
          Last updated: July 2026
        </p>

        <div className="space-y-10">

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <p className="text-zinc-400">
              When you apply for EDGE Spaces membership we may collect your
              name, email address, company, project, wallet address,
              LinkedIn profile, Telegram username and information you
              voluntarily provide in your application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Your Information
            </h2>

            <ul className="list-disc ml-6 text-zinc-400 space-y-2">
              <li>Review membership applications.</li>
              <li>Communicate with applicants and members.</li>
              <li>Issue digital membership cards.</li>
              <li>Operate and improve the EDGE Spaces community.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Digital Membership Cards
            </h2>

            <p className="text-zinc-400">
              Wallet addresses are used only for issuing optional digital
              membership cards. Membership cards are community credentials
              and do not represent financial assets or investment products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Sharing
            </h2>

            <p className="text-zinc-400">
              EDGE Spaces does not sell personal information. Information is
              shared only when necessary to operate the community or where
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact
            </h2>

            <p className="text-zinc-400">
              Questions regarding this Privacy Policy may be sent to
              contact@edgespaces.xyz.
            </p>
          </section>

        </div>

      </main>

    </div>

  )
}
