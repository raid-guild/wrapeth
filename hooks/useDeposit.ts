import { wethAddrs } from '../utils/contracts';
import WethAbi from '../contracts/wethAbi.json';
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from 'usehooks-ts';
import { utils, BigNumber } from 'ethers';

const useDeposit = (inputBalance: number) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const debouncedValue = useDebounce(inputBalance, 500);

  const contractAddress = wethAddrs?.[chain?.network];

  !inputBalance ? (inputBalance = 0) : null;

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

  const {
    write: writeDeposit,
    data: dataDeposit,
    isError: isErrorDeposit,
    error: errorDeposit,
  } = useContractWrite({
    ...config,
    request: config.request,
  });

  const { isLoading: isLoadingDeposit, isSuccess: isSuccessDeposit } =
    useWaitForTransaction({
      hash: dataDeposit?.hash,
      onSuccess(data: any) {
        console.log('Success', data);
      },
      onError(error: any) {
        console.log('Error', error);
      },
    });

  return {
    writeDeposit,
    dataDeposit,
    isErrorDeposit,
    errorDeposit,
    isLoadingDeposit,
    isSuccessDeposit,
  };
};

export default useDeposit;
