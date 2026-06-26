'use client'

export default function WalletSetup() {

  async function addAmoyNetwork() {

    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    try {

      await window.ethereum.request({

        method: 'wallet_addEthereumChain',

        params: [{

          chainId: '0x13882',

          chainName: 'Polygon Amoy Testnet',

          nativeCurrency: {
            name: 'POL',
            symbol: 'POL',
            decimals: 18
          },

          rpcUrls: [
            'https://rpc-amoy.polygon.technology/'
          ],

          blockExplorerUrls: [
            'https://amoy.polygonscan.com/'
          ]

        }]

      })

    } catch (err) {

      console.error(err)

    }

  }

  return (

    <div className="bg-black text-white min-h-screen">

      {/* HERO */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Wallet Setup
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Connect Your Wallet
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Connecting a wallet is completely optional.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            If you'd like to receive a Digital Membership Card,
            simply connect a compatible wallet.

          </p>

        </div>

      </section>

      {/* NETWORK */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Polygon Amoy
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Install The Network
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            EDGE Spaces currently issues Digital Membership Cards on the
            Polygon Amoy Testnet.

            <br /><br />

            If you don't already have the network installed,
            you can add it automatically below.

          </p>

          <div className="mt-8 space-y-3 text-zinc-300">

            <div>
              <span className="font-semibold text-white">
                Network:
              </span>{' '}
              Polygon Amoy Testnet
            </div>

            <div>
              <span className="font-semibold text-white">
                Chain ID:
              </span>{' '}
              80002
            </div>

            <div>
              <span className="font-semibold text-white">
                Currency:
              </span>{' '}
              POL
            </div>

            <div>
              <span className="font-semibold text-white">
                Explorer:
              </span>{' '}
              amoy.polygonscan.com
            </div>

          </div>

          <button
            onClick={addAmoyNetwork}
            className="mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Add Polygon Amoy
          </button>

        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}

      <section className="max-w-4xl mx-auto px-6 pb-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            What's Next?
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Receive Your Digital Membership Card
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Once your EDGE Spaces membership has been approved,
            you can add your wallet address during your application
            or at any time afterwards.

            <br /><br />

            Your Digital Membership Card will then be issued
            directly to your wallet.

          </p>

          <div className="mt-8 space-y-4 text-zinc-300">

            <div>
              ✓ Membership application approved
            </div>

            <div>
              ✓ Add your wallet address
            </div>

            <div>
              ✓ Receive your Digital Membership Card
            </div>

            <div>
              ✓ Access future partner benefits and governance features
            </div>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
            >
              Return Home
            </a>

            <a
              href="/community-card"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Learn About Digital Membership →
            </a>

          </div>

        </div>

      </section>

    </div>

  )
}

