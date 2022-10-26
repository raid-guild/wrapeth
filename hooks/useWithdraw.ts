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

  const contractAddress = wethAddrs?.[chain?.network || 'homestead'];
  !inputBalance ? (inputBalance = 0) : null;

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
  });

  const { status: statusWithdraw } = useWaitForTransaction({
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
    statusWithdraw,
  };
};

export default useWithdraw;
