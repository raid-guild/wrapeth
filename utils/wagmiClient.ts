/* eslint-disable import/prefer-default-export */
import { createClient } from 'wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  argentWallet,
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { chains, provider } from './chains';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',

    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, shimDisconnect: false }),
      walletConnectWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Wrap Eth' }),
      argentWallet({ chains }),
      braveWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  provider,
  connectors,
  // turn off autoConnect in development
  // autoConnect: true,
});
