import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useCustomToast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { utils, BigNumber } from 'ethers';

import { wethAddrs } from '../utils/contracts';
import WethAbi from '../contracts/wethAbi.json';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useNetwork();
  const toast = useCustomToast();
  const debouncedValue = useDebounce(inputBalance, 500);
  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || '',
    contractInterface: WethAbi,
    functionName: 'withdraw',
    enabled: Boolean(debouncedValue),
    args: [BigNumber.from(utils.parseEther(debouncedValue.toString() || '0'))],
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
        status: 'loading',
        title: 'Transaction pending...',
      });
    },
    onError(error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error({
        status: 'error',
        title: 'Error... transaction reverted...',
      });
    },
  });

  const { status: statusWithdraw } = useWaitForTransaction({
    hash: dataWithdraw?.hash,
    onSuccess: () => {
      toast.success({
        status: 'success',
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
