import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, fallback } from 'wagmi';
import {
  arbitrum,
  base,
  blast,
  gnosis,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';

const customGnosis = {
  ...gnosis,
  hasIcon: true,
  iconUrl: '/chains/gnosis.jpg',
  iconBackground: 'none',
};

export default getDefaultConfig({
  appName: 'Wrapeth',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: [
    mainnet,
    customGnosis,
    polygon,
    arbitrum,
    optimism,
    sepolia,
    base,
    zora,
    blast,
  ],
  transports: {
    [mainnet.id]: fallback([
      http(),
      http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [customGnosis.id]: fallback([
      http(),
      http(`https://gnosis.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [polygon.id]: fallback([
      http(),
      http(`https://polygon.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [arbitrum.id]: fallback([
      http(),
      http(`https://arbitrum.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [optimism.id]: fallback([
      http(),
      http(`https://optimism.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [sepolia.id]: fallback([
      http(),
      http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [base.id]: fallback([
      http(),
      http(`https://base.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [zora.id]: fallback([
      http(),
      http(`https://zora.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://zora-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
    [blast.id]: fallback([
      http(),
      http(`https://blast.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`),
      http(
        `https://blast-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      ),
    ]),
  },
  ssr: true,
});
