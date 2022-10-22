import React, { useEffect } from 'react';

import { Button } from '@raidguild/design-system';
import {
  useAccount,
  useNetwork,
  useProvider,
  useBalance,
  useContract,
  erc20ABI,
} from 'wagmi';
// import { useContract } from 'contexts/contractContext';
// import BN from 'bn.js';

export interface TokenInfoProps {
  /**
   * Deposit or withdraw form?
   */
  deposit: boolean;
  /**
   * Call set max function when token info clicked
   */
  setMax: () => void;
}

/**
 * Interface component for connecting web3 provider, getting account and displaying address in header
 */
const TokenInfo: React.FC<TokenInfoProps> = ({ deposit, setMax }) => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const contract = useContract({
    addressOrName: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    contractInterface: erc20ABI,
  });

  /*
  useEffect(() => {
    if (contract && isConnected && provider?) {
      const getInfo = async () => {
        try {
          // set wETH balance
          const wethBalanceInWei: string = await contract?.methods
            .balanceOf(address)
            .call()
            .then((response: string | BN) => response.toString());
          const wethBalance: string = provider?.utils
            .fromWei('' + wethBalanceInWei)
            .toString();
          // get Eth Balance
          const ethBalanceInWei: string = await provider?.eth
            .getBalance(address)
            .then((response: string | BN) => response.toString());
          const ethBalance = provider?.utils.fromWei(
            '' + ethBalanceInWei,
          );
          setCurrentUser({ ...currentUser, ...{ wethBalance, ethBalance } });
        } catch (e) {
          console.log('Error: ', e);
        }
      };

      getInfo();
    }

    // eslint-disable-next-line
  }, [contract]);
  */

  const forDisplay = (number: any | undefined): any => {
    return number ? (+number).toFixed(4) : 'Fetching ...';
  };

  return deposit ? (
    <Button variant='ghost' onClick={setMax}>
      {`${address} Balance:
      ${forDisplay(data)}`}
    </Button>
  ) : (
    <Button variant='ghost' onClick={setMax}>
      {`${'w' + address} Balance:
      ${forDisplay(data)}`}
    </Button>
  );
};

export default TokenInfo;
