import { erc20Abi, formatUnits } from 'viem';
import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { wethAddrs } from '../utils/contracts';

const useBalances = () => {
  const { address, chain } = useAccount();
  const contractAddress = wethAddrs?.[chain?.name.toLowerCase() || 'homestead'];

  // Get native ETH balance
  const { data: ethBalanceData } = useBalance({
    address,
    query: {
      enabled: !!contractAddress,
      refetchInterval: 3000,
      refetchIntervalInBackground: false,
    },
  });

  // Get WETH token balance using useReadContracts
  const { data: wethBalanceData } = useReadContracts({
    contracts: address
      ? [
          {
            address: contractAddress || '',
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
          },
          {
            address: contractAddress || '',
            abi: erc20Abi,
            functionName: 'decimals',
          },
        ]
      : [],
    query: {
      enabled: contractAddress?.length !== 0,
      refetchInterval: 3000,
      refetchIntervalInBackground: false,
    },
  });

  // Format the balances
  const ethBalance = ethBalanceData
    ? formatUnits(ethBalanceData.value, ethBalanceData.decimals)
    : '0';

  const wethBalance =
    wethBalanceData && wethBalanceData[0] && wethBalanceData[1]
      ? formatUnits(
          wethBalanceData[0].result as bigint,
          wethBalanceData[1].result as number,
        )
      : '0';

  return { ethBalance, wethBalance };
};

export default useBalances;
