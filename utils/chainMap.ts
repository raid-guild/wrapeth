const chainMappings = {
  // Chain ID → URL slug
  1: 'ethereum', // mainnet
  137: 'polygon', // polygon
  10: 'optimism', // optimism
  42161: 'arbitrum', // arbitrum one
  8453: 'base', // base
  100: 'gnosis', // gnosis
  11155111: 'sepolia', // sepolia
  168587773: 'blast', // blast
  7777777: 'zora', // zora

  // URL slug → Chain ID
  ethereum: 1,
  polygon: 137,
  optimism: 10,
  arbitrum: 42161,
  base: 8453,
  gnosis: 100,
  sepolia: 11155111,
  blast: 168587773,
  zora: 7777777
};

export default chainMappings;
