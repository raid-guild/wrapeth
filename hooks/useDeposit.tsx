import {
  useAccount,
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

const useDeposit = (inputBalance: number) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const toast = useCustomToast();

  const debouncedValue = useDebounce(inputBalance, 500);

  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || '',
    contractInterface: WethAbi,
    functionName: 'deposit',
    enabled: Boolean(debouncedValue),
    overrides: {
      from: address,
      value: BigNumber.from(utils.parseEther(debouncedValue.toString() || '0')),
    },
    onSuccess(data: any) {
      return data;
    },
    onError(error: any) {
      return error;
    },
  });

  const { write: writeDeposit, data: dataDeposit } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess() {
      toast.success({
        status: 'loading',
        title: 'Pending Transaction...',
        isClosable: true,
      });
    },
    onError() {
      toast.error({
        status: 'error',
        title: 'Error... transaction reverted...',
        isClosable: true,
      });
    },
  });

  const { status: statusDeposit } = useWaitForTransaction({
    hash: dataDeposit?.hash,
    onSuccess: () => {
      toast.success({
        status: 'success',
        title: `Success! Wrapped ${chain?.nativeCurrency?.symbol || 'ETH'}`,
        isClosable: true,
      });
    },
  });

  return {
    writeDeposit,
    dataDeposit,
    statusDeposit,
  };
};

export default useDeposit;
