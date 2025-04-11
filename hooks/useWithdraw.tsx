import wagmiConfig from '@/utils/wagmiConfig';
import { toast } from 'sonner';
import { useDebounceValue } from 'usehooks-ts';
import { parseEther } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import WethAbi from '../contracts/wethAbi.json';
import getWethAddress from '../utils/contracts';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useAccount();
  const [debouncedValue] = useDebounceValue(inputBalance, 500);
  const contractAddress = getWethAddress(
    chain?.name.toLowerCase() || 'homestead'
  );

  const {
    writeContractAsync,
    isPending: isWritePending,
    isError: isWriteError
  } = useWriteContract();

  const executeWithdraw = async () => {
    try {
      toast.promise(
        (async () => {
          const hash = await writeContractAsync({
            address: contractAddress || '',
            abi: WethAbi,
            functionName: 'withdraw',
            args: [BigInt(parseEther(debouncedValue.toString() || '0'))]
          });
          const receipt = await waitForTransactionReceipt(wagmiConfig, {
            hash
          });
          return receipt;
        })(),
        {
          loading: 'Unwrapping in progress...',
          success: () =>
            `Successfully unwrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
          error: 'Error... transaction reverted...'
        }
      );
    } catch (error) {
      console.error('Withdraw error:', error);
    }
  };

  return {
    writeWithdraw: executeWithdraw,
    isWritePending,
    isWriteError,
    canWithdraw: Boolean(debouncedValue)
  };
};

export default useWithdraw;
