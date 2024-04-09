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

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({
        projectId,
        chains,
        shimDisconnect: false,
      }),
      walletConnectWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'Wrap Eth' }),
      argentWallet({ projectId, chains }),
      braveWallet({ chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({ publicClient, connectors });
