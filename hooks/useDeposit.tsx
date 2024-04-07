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

const useDeposit = (inputBalance: number) => {
  const { address, chain } = useAccount();
  const toast = useToast();

  const debouncedValue = useDebounce(inputBalance, 500);

  const contractAddress = wethAddrs?.[chain?.id || 'homestead'];

  const { data: depositConfig } = useSimulateContract({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'deposit',
    account: address,
    value: BigInt(parseEther(debouncedValue.toString() || '0')),
  });

  const { writeContract: writeDeposit, data: dataDeposit, isPending: isPendingDeposit, isError: isErrorDeposit, isSuccess: isSuccessDeposit } = useWriteContract();

  const { status: statusDeposit } = useWaitForTransactionReceipt({
    hash: dataDeposit,
  });

  return {
    depositConfig,
    writeDeposit,
    dataDeposit,
    statusDeposit,
    isSuccessDeposit,
    isPendingDeposit,
    isErrorDeposit
  };
};

export default useDeposit;
