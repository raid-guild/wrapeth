import { useFeeData } from 'wagmi';
import { utils } from 'ethers';

const useGasFee = () => {
  const { data } = useFeeData();
  const maxGasFee = data?.maxFeePerGas || 0;
  const gasLimitEther = utils.formatUnits(maxGasFee) || 0;

  return { gasLimitEther };
};

export default useGasFee;
