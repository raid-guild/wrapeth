import { formatUnits } from 'viem';
import { useFeeData } from 'wagmi';

const useGasFee = () => {
  const { data } = useFeeData();
  const maxGasFee = data?.maxFeePerGas || 0;
  const gasLimitEther = formatUnits(maxGasFee as bigint, 9) || 0;

  return { gasLimitEther };
};

export default useGasFee;
