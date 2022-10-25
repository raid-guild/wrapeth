import { useAccount, useBalance, useNetwork } from 'wagmi';
import { wethAddrs } from '../utils/contracts';

const useBalances = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const contractAddress = wethAddrs?.[chain?.network];

  const getEthBalance = useBalance({
    addressOrName: address,
    enabled: contractAddress?.length !== 0,
    watch: true,
  });

  const getWethBalance = useBalance({
    addressOrName: address,
    enabled: contractAddress?.length !== 0,
    watch: true,
    token: contractAddress,
  });

  const ethBalance = getEthBalance.data?.formatted;
  const wethBalance = getWethBalance.data?.formatted;

  return { ethBalance, wethBalance };
};

export default useBalances;
