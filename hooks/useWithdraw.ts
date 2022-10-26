import { wethAddrs } from '../utils/contracts';
import WethAbi from '../contracts/wethAbi.json';
import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from 'usehooks-ts';
import { utils, BigNumber } from 'ethers';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useNetwork();
  const debouncedValue = useDebounce(inputBalance, 500);

  const contractAddress = wethAddrs?.[chain?.network];
  !inputBalance ? (inputBalance = 0) : null;

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || '',
    contractInterface: WethAbi,
    functionName: 'withdraw',
    enabled: Boolean(debouncedValue),
    args: [BigNumber.from(utils.parseEther(debouncedValue.toString() || '0'))],
    onSuccess(data: any) {
      return data;
    },
    onError(error: any) {
      return error;
    },
  });

  const {
    write: writeWithdraw,
    data: dataWithdraw,
    isError: isErrorWithdraw,
    error: errorWithdraw,
  } = useContractWrite({
    ...config,
    request: config.request,
  });

  const { isLoading: isLoadingWithdraw, isSuccess: isSuccessWithdraw } =
    useWaitForTransaction({
      hash: dataWithdraw?.hash,
      onSuccess(data: any) {
        console.log('Success', data);
      },
      onError(error: any) {
        console.log('Error', error);
      },
    });

  return {
    writeWithdraw,
    dataWithdraw,
    isErrorWithdraw,
    errorWithdraw,
    isLoadingWithdraw,
    isSuccessWithdraw,
  };
};

export default useWithdraw;
