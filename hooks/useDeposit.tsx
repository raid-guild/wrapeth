import wagmiConfig from '@/utils/wagmiConfig';
import { toast } from 'sonner';
import { useDebounceValue } from 'usehooks-ts';
import { parseEther } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import WethAbi from '../contracts/wethAbi.json';
import getWethAddress from '../utils/contracts';

const useDeposit = (inputBalance: number) => {
  const { address, chain } = useAccount();
  const [debouncedValue] = useDebounceValue(inputBalance, 500);
  const contractAddress = getWethAddress(chain?.name.toLowerCase() || 'homestead');

  const {
    writeContractAsync,
    isPending: isWritePending,
    isError: isWriteError
  } = useWriteContract();

  const executeDeposit = async () => {
    try {
      if (!contractAddress) {
        toast.error(
          `No WETH contract found for ${chain?.name || 'this network'}`
        );
        return;
      }
      toast.promise(
        (async () => {
          const hash = await writeContractAsync({
            address: contractAddress,
            abi: WethAbi,
            functionName: 'deposit',
            account: address,
            value: BigInt(parseEther(debouncedValue.toString() || '0'))
          });
          const receipt = await waitForTransactionReceipt(wagmiConfig, {
            hash
          });
          return receipt;
        })(),
        {
          loading: 'Wrapping in progress...',
          success: () =>
            `Successfully wrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
          error: 'Error... transaction reverted...'
        }
      );
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };

  return {
    writeDeposit: executeDeposit,
    isWritePending,
    isWriteError,
    canDeposit: debouncedValue > 0
  };
};

export default useDeposit;
