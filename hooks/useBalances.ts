import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useReadContracts
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
      enabled: !!address && !!contractAddress
    }
  });

  const { data: wethBalanceData, queryKey: wethQueryKey } = useReadContracts({
    contracts: address
      ? [
          {
            address: contractAddress || '',
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address]
          },
          {
            address: contractAddress || '',
            abi: erc20Abi,
            functionName: 'decimals'
          }
        ]
      : [],
    query: {
      enabled: !!address && !!contractAddress
    }
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey: ethQueryKey });
      queryClient.invalidateQueries({ queryKey: wethQueryKey });
    }
  }, [blockNumber, queryClient]);

  const ethBalance = ethBalanceData
    ? formatUnits(ethBalanceData.value, ethBalanceData.decimals)
    : '0';

  const balanceResult = wethBalanceData?.[0]?.result as bigint | undefined;
  const decimalsResult = wethBalanceData?.[1]?.result as number | undefined;
  const wethBalance =
    balanceResult && decimalsResult
      ? formatUnits(balanceResult, decimalsResult)
      : '0';

  return { ethBalance, wethBalance };
};

export default useBalances;
