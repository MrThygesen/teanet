'use client'

import WebAccessSBT from '../components/WebAccessSBT'

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

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
            Wallet Setup
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Prepare Your Wallet
          </h1>

          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">

            Digital memberships require Polygon Amoy to be configured
            in your wallet.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Once setup is complete, EDGE Spaces can issue membership
            cards directly to your wallet.

          </p>

        </div>

      </section>


      {/* NETWORK */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Network Configuration
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Polygon Amoy Testnet
          </h2>

          <div className="space-y-4 text-zinc-400">

            <div>
              <span className="text-white font-semibold">
                Network Name:
              </span>{' '}
              Polygon Amoy Testnet
            </div>

            <div>
              <span className="text-white font-semibold">
                Chain ID:
              </span>{' '}
              80002
            </div>

            <div>
              <span className="text-white font-semibold">
                Currency Symbol:
              </span>{' '}
              POL
            </div>

            <div>
              <span className="text-white font-semibold">
                Explorer:
              </span>{' '}
              amoy.polygonscan.com
            </div>

          </div>

          <button
            onClick={addAmoyNetwork}
            className="mt-8 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            Add Polygon Amoy Automatically
          </button>

        </div>

      </section>


      {/* FAUCETS */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Test Coins
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Polygon Amoy Faucets
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            Public community cards require a small amount of POL for transactions.

          </p>

          <div className="mt-8 space-y-4">

            <a
              href="https://faucet.polygon.technology/"
              target="_blank"
              className="block text-blue-400 hover:text-blue-300"
            >
              Polygon Faucet →
            </a>

            <a
              href="https://www.alchemy.com/faucets/polygon-amoy"
              target="_blank"
              className="block text-blue-400 hover:text-blue-300"
            >
              Alchemy Faucet →
            </a>

          </div>

        </div>

      </section>


      {/* VERIFY */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Verify Wallet
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Test Your Connection
          </h2>

          <p className="text-zinc-400">

            Successful login confirms that your wallet is ready to receive future digital memberships.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="/"
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700"
            >
              Return Home
            </a>

            <a
              href="/community-card"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Digital Membership →
            </a>

          </div>

        </div>

      </section>


      <section className="border-t border-zinc-800">

        <WebAccessSBT />

      </section>

    </div>

  )

}
