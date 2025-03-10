import { useToast } from '@raidguild/design-system';
import { useEffect, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { parseEther } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import WethAbi from '../contracts/wethAbi.json';
import { wethAddrs } from '../utils/contracts';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useAccount();
  const toast = useToast();
  const [debouncedValue, setDebouncedValue] = useDebounceValue(inputBalance, 500)
  const contractAddress = wethAddrs?.[chain?.name.toLowerCase() || 'homestead'];

  // Simulate the contract call first to validate it
  const { data: simulateData, isError: isSimulateError } = useSimulateContract({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'withdraw',
    args: [BigInt(parseEther(debouncedValue.toString() || '0'))],
  });

  // Use the writeContract hook to execute the transaction
  const {
    writeContract: writeWithdraw,
    data: dataWithdraw,
    isPending: isWritePending,
    isError: isWriteError,
  } = useWriteContract({
    mutation: {
      onSuccess() {
        toast.success({
          title: 'Transaction pending...',
        });
      },
      onError(error: any) {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error({
          title: 'Error... transaction reverted...',
        });
      },
    },
  });

  // Add a ref to track if we've already shown the toast for this transaction
  const hasShownToastRef = useRef<{ [txHash: string]: boolean }>({});

  // Wait for the transaction receipt
  const {
    data: receiptData,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    status: statusWithdraw
  } = useWaitForTransactionReceipt({
    hash: dataWithdraw,
  });

  // Use useEffect to handle the toast only once per transaction
  useEffect(() => {
    if (isConfirmed && receiptData && dataWithdraw) {
      // Check if we've already shown a toast for this transaction
      if (!hasShownToastRef.current[dataWithdraw]) {
        toast.success({
          title: `Success! Unwrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
          isClosable: true,
        });

        // Mark this transaction as having shown a toast
        hasShownToastRef.current[dataWithdraw] = true;
      }
    }
  }, [isConfirmed, receiptData, dataWithdraw, chain?.nativeCurrency?.symbol, toast]);

  // Function to execute the withdraw
  const executeWithdraw = () => {
    if (simulateData?.request) {
      writeWithdraw(simulateData.request);
    }
  };

  return {
    writeWithdraw: executeWithdraw,
    dataWithdraw,
    statusWithdraw,
    isConfirming,
    isConfirmed,
    isWritePending,
    isSimulateError,
    isWriteError,
    canWithdraw: Boolean(simulateData?.request),
  };
};

export default useWithdraw;
