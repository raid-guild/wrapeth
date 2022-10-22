import { Chain } from '@rainbow-me/rainbowkit';
import { chain, configureChains } from 'wagmi';
// import { infuraProvider } from 'wagmi/providers/infura';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
// import logo from '../assets/gnosis-logo.png';

const xdai: Chain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'gnosis',
  // iconUrl: logo,
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
    // xdai,
    chain.polygon,
    chain.arbitrum,
    chain.optimism,
    chain.rinkeby,
    chain.kovan,
    chain.goerli,
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    // jsonRpcProvider()
    // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_RPC_KEY })
  ],
);
