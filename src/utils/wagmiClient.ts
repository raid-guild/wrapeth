import { chain, configureChains, createClient, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

console.log(chain);

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.rinkeby,
    chain.kovan,
    chain.optimismKovan,
    chain.arbitrumGoerli,
    chain.arbitrumRinkeby,
  ],
  [
    alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
    infuraProvider({ apiKey: 'yourInfuraApiKey' }),
    publicProvider(),
  ],
);

const client = createClient({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  autoConnect: true,
});

export default client;
