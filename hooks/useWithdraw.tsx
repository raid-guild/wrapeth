import { useToast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { parseEther } from 'viem';
import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

import WethAbi from '../contracts/wethAbi.json';
import { wethAddrs } from '../utils/contracts';

const useWithdraw = (inputBalance: number) => {
  const { chain } = useAccount();
  const toast = useToast();
  const debouncedValue = useDebounce(inputBalance, 500);
  const contractAddress = wethAddrs?.[chain?.id || 'homestead'];

  const { data: withdrawConfig } = useSimulateContract({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'withdraw',
    args: [BigInt(parseEther(debouncedValue.toString() || '0'))],
  });

  const { writeContract: writeWithdraw, data: dataWithdraw, isPending: isPendingWithdraw, isSuccess: isSuccessWithdraw, isError: isErrorWithdraw } = useWriteContract();

  const { status: statusWithdraw } = useWaitForTransactionReceipt({
    hash: dataWithdraw,
  });

  return {
    withdrawConfig,
    writeWithdraw,
    dataWithdraw,
    statusWithdraw,
    isSuccessWithdraw,
    isPendingWithdraw,
    isErrorWithdraw
  };
};

export default useWithdraw;
