import React from 'react';
import {
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

const useWithdraw = (inputBalance: number) => {
  const { chain } = useNetwork();
  const toast = useToast();
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

  const { status: statusWithdraw } = useWaitForTransaction({
    hash: dataWithdraw?.hash,
    onSuccess: () => {
      toast({
        duration: 5000,
        render: () => <Toast title='Success!' />,
      });
    },
    // onError(error: any) {
    //   // eslint-disable-next-line no-console
    //   console.log('Error', error);
    //   toast({
    //     duration: 5000,
    //     render: () => <Toast title='Error!' />,
    //   });
    // },
  });

  return {
    writeWithdraw,
    dataWithdraw,
    statusWithdraw,
  };
};

export default useWithdraw;
