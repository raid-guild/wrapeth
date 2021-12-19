import React from 'react';

import { Button, Text, HStack } from '@raidguild/design-system';
import { LinkIcon } from '@chakra-ui/icons';
import { useCurrentUser } from 'contexts/currentUserContext';
import { useInjectedProvider } from 'contexts/injectedProviderContext';
import { truncateAddress } from 'utils/general';

export interface AccountButtonProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

/**
 * Interface component for connecting web3 provider, getting account and displaying address in header
 */
const AccountButton: React.FC<AccountButtonProps> = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { requestWallet, disconnectDapp } = useInjectedProvider();

  const connectWallet = async () => {
    await requestWallet();
  };

  return currentUser?.username ? (
    <Button maxW='200px' variant='outline' onClick={() => disconnectDapp()}>
      <HStack spacing={4}>
        <LinkIcon color='primaryAlpha.500' onClick={() => disconnectDapp()} />
        <Text fontFamily='mono'>{truncateAddress(currentUser.username)}</Text>
      </HStack>
    </Button>
  ) : (
    <Button maxW='200px' variant='solid' onClick={() => connectWallet()}>
      Connect
      {children}
    </Button>
  );
};

export default AccountButton;
