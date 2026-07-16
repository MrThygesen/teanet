import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from '../utils/wagmi.config'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EDGE Spaces</title>
        <meta
          name="description"
          content="EDGE Spaces - Venture ecosystem for founders, advisors, investors and ecosystem partners."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <RainbowKitProvider>
            <Component {...pageProps} />
            <Toaster position="top-right" />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  )
}
