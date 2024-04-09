import { formatUnits } from 'viem';
import { useFeeData, useNetwork } from 'wagmi';

const useGasFee = () => {
  const { chain } = useNetwork();
  const { data } = useFeeData();
  const gasPrice = data?.gasPrice || 0;

  const gasUsedByChain = {
    1: 50000, // Ethereum
    100: 70000, // Gnosis
    137: 50000, // Polygon
    42161: 100000, // Arbitrum One
    10: 50000, // OP Mainnet
    5: 50000, // Goerli
    11155111: 85000, // Sepolia
  };

  const estimatedGasUsed = chain?.id ? gasUsedByChain[chain.id] : 0;

  const txFeeWei = BigInt(gasPrice) * BigInt(estimatedGasUsed);
  const txFeeEther = formatUnits(txFeeWei, 18) || 0;

  return { txFeeEther };
};

export default useGasFee;
