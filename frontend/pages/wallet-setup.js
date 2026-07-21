'use client'

export default function WalletSetup() {

  async function addPolygonNetwork() {

    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    try {

      await window.ethereum.request({

        method: 'wallet_addEthereumChain',

        params: [{

          chainId: '0x89',

          chainName: 'Polygon Mainnet',

          nativeCurrency: {
            name: 'POL',
            symbol: 'POL',
            decimals: 18
          },

          rpcUrls: [
            'https://polygon-rpc.com'
          ],

          blockExplorerUrls: [
            'https://polygonscan.com/'
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

            A crypto wallet is completely optional.

          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">

            Once your membership has been approved, simply connect a
            Polygon-compatible wallet and claim your Digital Membership directly from your profile.

          </p>

        </div>

      </section>


{/* RECOMMENDED WALLETS */}

<div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

  <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
    Recommended Wallets
  </div>

  <h2 className="text-3xl font-bold mb-6">
    Wallet Recommendations
  </h2>

  <div className="space-y-8 text-zinc-300 leading-relaxed">

    <div>
      <div className="font-semibold text-white text-lg">
        ⭐⭐⭐⭐⭐ MetaMask Browser Extension (Desktop)
      </div>
      <p className="mt-2 text-zinc-400">
        Our recommended desktop wallet. Fast, reliable and fully compatible
        with EDGE Spaces. NFT viewing works well and wallet interactions are
        smooth. Polygon is preistalled.]
      </p>
    </div>

    <div>
      <div className="font-semibold text-white text-lg">
        ⭐⭐⭐⭐☆ Rainbow Mobile App (Mobile)
      </div>
      <p className="mt-2 text-zinc-400">
        Our recommended mobile wallet. Excellent NFT presentation and an
        intuitive user experience. For the best experience, open EDGE Spaces
        from inside Rainbow's built-in browser. Just ensure to switch network into Polygon in the Dapp Browser (click your wallet icon).
      </p>
    </div>

    <div>
      <div className="font-semibold text-white text-lg">
        ⭐⭐⭐⭐☆ Rainbow Browser Extension
      </div>
      <p className="mt-2 text-zinc-400">
        Reliable wallet for desktop connections. At the time of testing it
        does not display NFTs inside the extension and does not provide a
        direct OpenSea link for the NFT / Collection.
      </p>
    </div>

    <div>
      <div className="font-semibold text-white text-lg">
        ⭐⭐⭐☆☆ MetaMask Mobile App
      </div>
      <p className="mt-2 text-zinc-400">
 In times of testing Metamask Mobile App seemed slow, and could not any Dapp browser. It could however import the NFT manually, and it also has the link for OpenSea. 
      </p>
    </div>

  </div>

  <div className="mt-8 rounded-xl border border-blue-700 bg-blue-950/30 p-5 text-zinc-300">
    <div className="font-semibold text-white mb-2">
      Testing Notes
    </div>

    Ratings are based on hands-on testing with EDGE Spaces on Polygon
    Mainnet and reflect our current experience. Wallet features and user
    interfaces may change over time.
  </div>

</div>
      {/* POLYGON */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Polygon Mainnet
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Install The Network
          </h2>

          <p className="text-zinc-400 leading-relaxed">

          Digital Memberships are issued on Polygon Mainnet.

            <br /><br />

            Most modern wallets already support Polygon.
            If your wallet doesn't, you can add it automatically below.

          </p>

          <div className="mt-8 space-y-3 text-zinc-300">

            <div>
              <span className="font-semibold text-white">
                Network:
              </span>{' '}
              Polygon Mainnet
            </div>

            <div>
              <span className="font-semibold text-white">
                Chain ID:
              </span>{' '}
              137
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
              polygonscan.com
            </div>

          </div>

          <button
            onClick={addPolygonNetwork}
            className="mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Add Polygon Network
          </button>

        </div>

      </section>

      {/* CLAIM */}

      <section className="max-w-4xl mx-auto px-6 pb-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Claim Your Digital Membership
          </div>

          <h2 className="text-3xl font-bold mb-6">
            One Click After Approval
          </h2>

          <p className="text-zinc-400 leading-relaxed">

            After your membership has been approved, simply visit your
            Profile page, connect your wallet and click
            <strong> Claim Community Membership</strong>.

            <br /><br />

            Your Digital Membership will be issued directly to your wallet.

            <br /><br />

            Polygon transaction fees are extremely low, making the minting
            process almost costless.

          </p>

          <div className="mt-8 space-y-4 text-zinc-300">

            <div>✓ Membership approved</div>

            <div>✓ Connect your Polygon wallet</div>

            <div>✓ Claim with one click</div>

            <div>✓ Membership issued directly to your wallet</div>

          </div>

        </div>

      </section>

      {/* METAMASK */}

      <section className="max-w-4xl mx-auto px-6 pb-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            MetaMask Users
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Viewing Your Membership
          </h2>

          <p className="text-zinc-400 leading-relaxed">

             Your Digital Membership is issued immediately on Polygon Mainnet...

            <br /><br />

 Some wallets such as Metamask Browser Extension shows the membership card in the NFT section automatically, while the Metamask Mobile App requires that you import NFT and provides the contract and token number.

            <br /><br />

           After importing, your Digital Membership will appear in your wallet with its image, title and description.

            <br /><br />

            The complete membership details, including membership
            details are always available on the EDGE Spaces website,
            and are also recognised by NFT marketplaces such as OpenSea.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/profile"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Open My Profile
            </a>

            <a
              href="/community-card"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
            >
              Learn About Digital Membership
            </a>

          </div>

        </div>

      </section>

    </div>

  )
}
