import { useAccount, useBalance, useNetwork } from 'wagmi';
import { wethAddrs } from '../utils/contracts';

const useBalances = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];

  const getEthBalance = useBalance({
    address,
    enabled: contractAddress?.length !== 0,
    watch: true,
  });

  const getWethBalance = useBalance({
    address,
    enabled: contractAddress?.length !== 0,
    watch: true,
    token: contractAddress,
  });

  const ethBalance = getEthBalance.data?.formatted || '0';
  const wethBalance = getWethBalance.data?.formatted || '0';

  return { ethBalance, wethBalance };
};

export default useBalances;
