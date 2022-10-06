import { chain, configureChains, createClient } from 'wagmi';
import {
  Chain,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

export const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.rinkeby,
    chain.kovan,
    chain.goerli,
    chain.optimismKovan,
    chain.arbitrumGoerli,
    chain.arbitrumRinkeby,
  ],
  [
    // infuraProvider({ apiKey: process.env.REACT_APP_RPC_KEY }),
    infuraProvider({ apiKey: '887f20f0a8494bdfbd0913f97f9e838b' }),
  ],
);

export const wagmiClient = createClient({
  provider,
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({
      chains,
    }),
  ],
});
