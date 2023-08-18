import { useToast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { parseEther } from 'viem';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import WethAbi from '../contracts/wethAbi.json';
import { wethAddrs } from '../utils/contracts';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useNetwork();
  const toast = useToast();
  const debouncedValue = useDebounce(inputBalance, 500);
  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];

  const { config } = usePrepareContractWrite({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'withdraw',
    enabled: Boolean(debouncedValue),
    args: [BigInt(parseEther(debouncedValue.toString() || '0'))],
    onSuccess(data: any): any {
      return data;
    },
    onError(error: any): any {
      return error;
    },
  });

  const { write: writeWithdraw, data: dataWithdraw } = useContractWrite({
    ...config,
    request: config.request,
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
  });

  const { status: statusWithdraw } = useWaitForTransaction({
    hash: dataWithdraw?.hash,
    onSuccess: () => {
      toast.success({
        title: `Success! Unwrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
      });
    },
  });

  return {
    writeWithdraw,
    dataWithdraw,
    statusWithdraw,
  };
};

export default useWithdraw;
