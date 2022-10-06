import { chain, configureChains, createClient } from 'wagmi';
import {
  Chain,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
// import { publicProvider } from 'wagmi/providers/public';
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
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    infuraProvider({ apiKey: process.env.REACT_APP_RPC_KEY }),
    // publicProvider(),
  ],
);

export const { connectors } = getDefaultWallets({
  appName: 'Wrap ETH',
  chains,
});

export const wagmiClient = createClient({
  provider,
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: 'wagmi.sh',
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
      },
    }),
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
  ],
});
