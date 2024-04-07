// import { configureChains } from 'wagmi';
// import {
//   arbitrum,
//   gnosis,
//   goerli,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { infuraProvider } from 'wagmi/providers/infura';
// import { publicProvider } from 'wagmi/providers/public';

// const customGnosis = {
//   ...gnosis,
//   hasIcon: true,
//   iconUrl: '/chains/gnosis.jpg',
//   iconBackground: 'none',
// };

// export const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, customGnosis, polygon, arbitrum, optimism, goerli, sepolia],
//   [
//     infuraProvider({ apiKey: process.env.NEXT_PUBLIC_RPC_KEY || '' }),
//     alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' }),
//     publicProvider(),
//   ],
// );
