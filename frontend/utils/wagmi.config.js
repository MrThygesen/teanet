import { http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const config = getDefaultConfig({
  appName: 'EDGE Spaces',
  projectId,

  chains: [polygon],

  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
  },

  ssr: true,
})
