/* eslint-disable import/prefer-default-export */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig } from 'wagmi';

import { chains, publicClient } from './chains';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
        shimDisconnect: false,
      }),
      walletConnectWallet({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
      }),
      ledgerWallet({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
      }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
      }),
      coinbaseWallet({ chains, appName: 'Wrap Eth' }),
      argentWallet({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
      }),
      braveWallet({ chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  publicClient,
  connectors,
  // turn off autoConnect in development
  // autoConnect: true,
});
