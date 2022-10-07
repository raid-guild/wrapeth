import { chain, configureChains, createClient } from 'wagmi';
import {
  Chain,
  connectorsForWallets,
  // getDefaultWallets,
  // RainbowKitProvider,
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
import { infuraProvider } from 'wagmi/providers/infura';

export const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.optimism,
    chain.arbitrum,
    chain.polygon,
    chain.kovan,
    chain.goerli,
    chain.polygonMumbai,
  ],
  [infuraProvider({ apiKey: process.env.REACT_APP_RPC_KEY })],
);

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
  autoConnect: false,
});
