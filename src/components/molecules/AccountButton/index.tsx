import React from 'react';

import { Button, Text } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { useInjectedProvider } from '../../../contexts/injectedProviderContext';
import { useCurrentUser } from '../../../contexts/currentUserContext';

export interface AccountButtonProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

/**
 * Interface component for connecting web3 provider, getting account and displaying address in header
 */
export const AccountButton: React.FC<AccountButtonProps> = ({ children }) => {
  const { requestWallet, disconnectDapp } = useInjectedProvider();
  const { currentUser } = useCurrentUser();

  const connectWallet = async () => {
    await requestWallet();
  };

  return currentUser?.username ? (
    <Button
      textStyle='buttonLabel'
      maxW='120px'
      variant={'outline'}
      onClick={() => disconnectDapp()}
    >
      <LinkIcon
        color='primaryAlpha.500'
        onClick={() => disconnectDapp()}
        pr='5px'
      />
      <Text overflow='hidden' textOverflow='ellipsis' isTruncated color='white'>
        {currentUser.username}
      </Text>
    </Button>
  ) : (
    <Button
      textStyle='buttonLabel'
      maxW='120px'
      variant={'solid'}
      onClick={() => connectWallet()}
    >
      Connect
      {children}
    </Button>
  );
};
