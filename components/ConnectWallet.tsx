import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { FiKey, FiChevronDown, FiXCircle } from 'react-icons/fi';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  HStack,
  Box,
  Flex,
  Image,
} from '@raidguild/design-system';
import { truncateAddress } from 'utils/general';

export const ConnectWallet: React.FC = () => {
  const { isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => (
        <div
          {...(!mounted && {
            'aria-hidden': true,
            style: {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <Button
                  color='brand.primary.600'
                  backgroundColor='brand.primary.50'
                  transition='all 100ms ease-in-out'
                  _hover={{
                    bgColor: 'brand.primary.100',
                    borderWidth: '2px',
                    borderColor: 'brand.primary.600',
                  }}
                  leftIcon={<FiKey />}
                  disabled={isConnecting}
                  onClick={openConnectModal}
                  data-cy='connect-wallet'
                >
                  Connect
                </Button>
              );
            }

            if (chain.unsupported) {
              return (
                <Button
                  onClick={openChainModal}
                  color='brand.primary.600'
                  backgroundColor='brand.primary.50'
                  transition='all 100ms ease-in-out'
                  border='2px'
                  borderColor='white'
                  _hover={{
                    bgColor: 'brand.primary.100',
                    borderWidth: '2px',
                    borderColor: 'brand.primary.600',
                  }}
                >
                  Unsupported network
                </Button>
              );
            }

            return (
              <Flex gap={3}>
                <Menu offset={[0, 4]} placement='bottom-end' autoSelect={false}>
                  <Button
                    display='flex'
                    flexDirection='row'
                    color='brand.primary.600'
                    backgroundColor='brand.primary.50'
                    transition='all 100ms ease-in-out'
                    _hover={{ bgColor: 'brand.primary.100' }}
                    width='fit'
                    onClick={openChainModal}
                  >
                    <Image
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      width={25}
                      height={25}
                      mr={2}
                    />
                    {chain.name}
                  </Button>

                  <MenuButton
                    as={Button}
                    rightIcon={
                      <Icon as={FiChevronDown} color='brand.primary.600' />
                    }
                    color='brand.primary.600'
                    backgroundColor='brand.primary.50'
                    transition='all 100ms ease-in-out'
                    _hover={{ bgColor: 'brand.primary.100' }}
                    width='fit'
                  >
                    {account.ensName
                      ? account.ensName
                      : truncateAddress(account.address)}
                  </MenuButton>
                  <MenuList backgroundColor='gray.800' minWidth='none'>
                    <MenuItem
                      onClick={() => openAccountModal()}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      <HStack>
                        <Icon as={FiKey} color='white' />
                        <Box color='white'>Wallet</Box>
                      </HStack>
                    </MenuItem>
                    <MenuItem
                      onClick={() => disconnect()}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      <HStack spacing={2}>
                        <Icon as={FiXCircle} color='red.300' />
                        <Box color='red.300'>Sign Out</Box>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            );
          })()}
        </div>
      )}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
