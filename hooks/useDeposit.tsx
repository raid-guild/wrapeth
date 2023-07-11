import { useToast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { parseEther } from 'viem';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import WethAbi from '../contracts/wethAbi.json';
import { wethAddrs } from '../utils/contracts';

const useDeposit = (inputBalance: number) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const toast = useToast();

  const debouncedValue = useDebounce(inputBalance, 500);

  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];

  const { config } = usePrepareContractWrite({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'deposit',
    enabled: Boolean(debouncedValue),
    account: address,
    value: BigInt(parseEther(debouncedValue.toString() || '0')),
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
  });

  const { status: statusDeposit } = useWaitForTransaction({
    hash: dataDeposit?.hash,
    onSuccess: () => {
      toast.success({
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
