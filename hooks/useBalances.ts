import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useReadContracts,
} from 'wagmi';
import { wethAddrs } from '../utils/contracts';

const useBalances = () => {
  const { address, chain } = useAccount();
  const contractAddress = wethAddrs?.[chain?.name.toLowerCase() || 'homestead'];
  const queryClient = useQueryClient();

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: ethBalanceData, queryKey: ethQueryKey } = useBalance({
    address,
    query: {
      enabled: !!contractAddress,
    },
  });

  const { data: wethBalanceData, queryKey: wethQueryKey } = useReadContracts({
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
      enabled: !!contractAddress,
    },
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey: ethQueryKey });
      queryClient.invalidateQueries({ queryKey: wethQueryKey });
    }
  }, [blockNumber, queryClient, ethQueryKey, wethQueryKey]);

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
