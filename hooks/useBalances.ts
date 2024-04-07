import { useAccount, useBalance } from 'wagmi';
import { wethAddrs } from '../utils/contracts';

const useBalances = () => {
  const { address, chain } = useAccount();

  const contractAddress = wethAddrs?.[chain?.id || 'homestead'];

  const getEthBalance = useBalance({
    address,
  });

  const getWethBalance = useBalance({
    address,
    token: contractAddress,
  });

  const ethBalance = getEthBalance.data?.formatted || '0';
  const wethBalance = getWethBalance.data?.formatted || '0';

  return { ethBalance, wethBalance };
};

export default useBalances;
