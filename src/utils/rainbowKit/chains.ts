import { Chain } from '@rainbow-me/rainbowkit';
import { chain, configureChains } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import logo from 'assets/gnosis-logo.png';

const xdai: Chain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis Chain',
  iconUrl: logo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDAI',
  },
  rpcUrls: {
    default: 'https://dai.poa.network',
  },
  blockExplorers: {
    default: { name: 'BlockScout', url: 'https://blockscout.com/poa/xdai' },
  },
  testnet: false,
};

export const { chains, provider } = configureChains(
  [
    chain.mainnet,
    xdai,
    chain.optimism,
    chain.arbitrum,
    chain.polygon,
    chain.kovan,
    chain.goerli,
    chain.polygonMumbai,
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default,
      }),
    }),
    infuraProvider({ apiKey: process.env.REACT_APP_RPC_KEY }),
  ],
);
