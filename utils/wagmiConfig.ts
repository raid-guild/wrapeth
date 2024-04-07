/* eslint-disable import/prefer-default-export */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  arbitrum,
  gnosis,
  goerli,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

const customGnosis = {
  ...gnosis,
  hasIcon: true,
  iconUrl: '/chains/gnosis.jpg',
  iconBackground: 'none',
};


export const wagmiConfig = getDefaultConfig({
  appName: 'Wrapeth',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: [mainnet, customGnosis, polygon, arbitrum, optimism, goerli, sepolia],
  transports: {
    [mainnet.id]: http(),
    [customGnosis.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http(),
  },
});
