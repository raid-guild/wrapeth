import React from 'react';
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useToast, Toast } from '@raidguild/design-system';
import { useDebounce } from 'usehooks-ts';
import { utils, BigNumber } from 'ethers';

import { wethAddrs } from '../utils/contracts';
import WethAbi from '../contracts/wethAbi.json';

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
    onSuccess() {
      toast({
        duration: 2000,
        render: () => <Toast title='Transaction pending...' />,
      });
    },
    onError(error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast({
        duration: 5000,
        render: () => <Toast title='Error!' />,
      });
    },
  });

  const { status: statusDeposit } = useWaitForTransaction({
    hash: dataDeposit?.hash,
    onSuccess: () => {
      // console.log('Success', data);
      toast({
        duration: 5000,
        render: () => <Toast title='Success!' />,
      });
    },
    // onError(error: any) {
    //   // eslint-disable-next-line no-console
    //   console.log(error);
    //   toast({
    //     duration: 5000,
    //     render: () => <Toast title='Error!' />,
    //   });
    // },
  });

  return {
    writeDeposit,
    dataDeposit,
    statusDeposit,
  };
};

export default useDeposit;
