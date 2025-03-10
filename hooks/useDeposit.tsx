import { useToast } from '@raidguild/design-system';
import { useEffect, useMemo, useRef } from 'react';
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

const useDeposit = (inputBalance: number) => {
  const { address, chain } = useAccount();
  const toast = useToast();
  const [debouncedValue, setDebouncedValue] = useDebounceValue(inputBalance, 500);
  const contractAddress = wethAddrs?.[chain?.name.toLowerCase() || 'homestead'];

  // Add error handling and validation for the debounced value
  const simulateValue = useMemo(() => {
    try {
      if (!debouncedValue || Number.isNaN(Number(debouncedValue))) return BigInt(0);
      // Ensure the value is a proper string number
      const normalizedValue = debouncedValue.toString().replace(',', '.');
      return BigInt(parseEther(normalizedValue));
    } catch (error) {
      console.error('Error parsing value for simulation:', error);
      return BigInt(0);
    }
  }, [debouncedValue]);

  // Simulate the contract call first to validate it
  const { data: simulateData, isError: isSimulateError } = useSimulateContract({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'deposit',
    account: address,
    value: simulateValue,
  });

  // Use the writeContract hook to execute the transaction
  const {
    writeContract: writeDeposit,
    data: dataDeposit,
    isPending: isWritePending,
    isError: isWriteError,
  } = useWriteContract({
    mutation: {
      onSuccess() {
        toast.success({
          title: 'Pending Transaction...',
          isClosable: true,
        });
      },
      onError() {
        toast.error({
          title: 'Error... transaction reverted...',
          isClosable: true,
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
    status: statusDeposit
  } = useWaitForTransactionReceipt({
    hash: dataDeposit,
    query: {
      refetchOnWindowFocus: false,
    }
  });

  // Use useEffect to handle the toast only once per transaction
  useEffect(() => {
    if (isConfirmed && receiptData && dataDeposit) {
      // Check if we've already shown a toast for this transaction
      if (!hasShownToastRef.current[dataDeposit]) {
        toast.success({
          title: `Success! Wrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
          isClosable: true,
        });

        // Mark this transaction as having shown a toast
        hasShownToastRef.current[dataDeposit] = true;
      }
    }
  }, [isConfirmed, receiptData, dataDeposit, chain?.nativeCurrency?.symbol, toast]);

  // Function to execute the deposit
  const executeDeposit = () => {
    if (simulateData?.request) {
      writeDeposit(simulateData.request);
    }
  };

  return {
    writeDeposit: executeDeposit,
    dataDeposit,
    statusDeposit,
    isConfirming,
    isConfirmed,
    isWritePending,
    isSimulateError,
    isWriteError,
    canDeposit: Boolean(simulateData?.request),
  };
};

export default useDeposit;
