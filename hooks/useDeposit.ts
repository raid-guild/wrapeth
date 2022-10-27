import { wethAddrs } from '../utils/contracts';
import WethAbi from '../contracts/wethAbi.json';
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useToast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { utils, BigNumber } from 'ethers';

const useDeposit = (inputBalance: number) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const toast = useToast();
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
    onSuccess(data) {
      console.log('tx submitted', data);
      toast({
        title: 'Transaction pending...',
        description: `Please wait a moment...`,
        isClosable: true,
        status: 'info',
        duration: 10000,
      });
    },
  });

  const { status: statusDeposit } = useWaitForTransaction({
    hash: dataDeposit?.hash,
    onSuccess: (data: any) => {
      console.log('Success', data);
      toast({
        title: 'Success!',
        description: `Wrapped ${chain?.nativeCurrency?.symbol}!`,
        isClosable: true,
        status: 'info',
        duration: 30000,
      });
    },
    onError(error: any) {
      console.log('Error', error);
    },
  });

  return {
    writeDeposit,
    dataDeposit,
    statusDeposit,
  };
};

export default useDeposit;
