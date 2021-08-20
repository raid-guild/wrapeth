import React, { useEffect } from 'react';

import { Button } from '@chakra-ui/react';
import { useInjectedProvider } from '../../../contexts/injectedProviderContext';
import { useCurrentUser } from '../../../contexts/currentUserContext';
import { useContract } from '../../../contexts/contractContext';
import BN from 'bn.js';

export interface TokenInfoProps {
  /**
   * Deposit or withdraw form?
   */
  deposit: boolean;
}

/**
 * Interface component for connecting web3 provider, getting account and displaying address in header
 */
export const TokenInfo: React.FC<TokenInfoProps> = ({ deposit }) => {
  const { injectedProvider } = useInjectedProvider();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { contract } = useContract();

  useEffect(() => {
    if (contract && currentUser && injectedProvider) {
      console.log('contract', contract);
      const getInfo = async () => {
        try {
          // set wETH balance
          const wethBalanceInWei: string = await contract?.methods
            .balanceOf(currentUser?.username)
            .call()
            .then((response: string | BN) => response.toString());
          const wethBalance: string = injectedProvider.utils
            .fromWei('' + wethBalanceInWei)
            .toString();
          // get Eth Balance
          const ethBalanceInWei: string = await injectedProvider.eth
            .getBalance(currentUser?.username)
            .then((response: string | BN) => response.toString());
          const ethBalance = injectedProvider.utils.fromWei(
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

  const forDisplay = (number: string | undefined): string => {
    return number ? (+number).toFixed(4) : 'Fetching ...';
  };

  return deposit ? (
    <Button variant='ghost'>
      {`${currentUser?.network?.chain} Balance:
      ${forDisplay(currentUser?.ethBalance)}`}
    </Button>
  ) : (
    <Button variant='ghost'>
      {`${'w' + currentUser?.network?.chain} Balance:
      ${forDisplay(currentUser?.wethBalance)}`}
    </Button>
  );
};
