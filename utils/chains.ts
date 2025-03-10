import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  arbitrum,
  base,
  blast,
  gnosis,
  // goerli,
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
    // goerli,
    sepolia,
    base,
    zora,
    blast,
  ],
  transports: {
    [mainnet.id]: http(),
    [customGnosis.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    // [goerli.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [zora.id]: http(),
    [blast.id]: http(),
  },
});
