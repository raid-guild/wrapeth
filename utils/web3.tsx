import React, { ReactNode } from 'react';
import { createClient } from 'wagmi';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
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
import { WagmiConfig } from 'wagmi';

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

const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: false,
});

export const Web3Provider = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
  </WagmiConfig>
);
