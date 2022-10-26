import { useFeeData } from 'wagmi';
import { utils } from 'ethers';

const useGasFee = () => {
  const { data } = useFeeData();
  const maxGasFee = data?.maxFeePerGas;
  const gasLimitEther = utils.formatUnits(maxGasFee);
  //   const gasLimitGwei = utils.formatUnits(maxGasFee, 9);
  return {
    gasLimitEther,
    // gasLimitGwei
  };
};

export default useGasFee;
