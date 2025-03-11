import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@raidguild/design-system';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { FiChevronDown, FiKey, FiXCircle } from 'react-icons/fi';
import { truncateAddress } from 'utils/general';
import { useAccount, useChains, useDisconnect, useSwitchChain } from 'wagmi';

// Simple bidirectional mapping between URL slugs and chain names
const chainMappings = {
  // Chain name → URL slug
  'Ethereum': 'ethereum',
  'Polygon': 'polygon',
  'OP Mainnet': 'optimism',
  'Arbitrum One': 'arbitrum',
  'Base': 'base',
  'Gnosis': 'gnosis',
  'Sepolia': 'sepolia',
  'Blast': 'blast',
  'Zora': 'zora',

  // URL slug → Chain name
  'ethereum': 'Ethereum',
  'polygon': 'Polygon',
  'optimism': 'OP Mainnet',
  'arbitrum': 'Arbitrum One',
  'base': 'Base',
  'gnosis': 'Gnosis',
  'sepolia': 'Sepolia',
  'blast': 'Blast',
  'zora': 'Zora',
};

export const ConnectWallet: React.FC = () => {
  const { isConnecting, isConnected, chain: accountChain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chains = useChains();
  const router = useRouter();
  const isSyncing = useRef(false);

  useEffect(() => {
    if (!router.isReady || !isConnected || !accountChain || isSyncing.current) return;

    const chainName = typeof router.query.chain === 'string'
      ? router.query.chain.toLowerCase()
      : null;
    const currentChainName = chainMappings[accountChain.name];
    if (chainName && chainMappings[chainName] && chainMappings[chainName] !== accountChain.name) {
      const targetChain = chains.find(c => c.name === chainMappings[chainName]);

      if (targetChain) {
        isSyncing.current = true;
        console.log(`Switching to ${chainMappings[chainName]}`);

        try {
          switchChain({ chainId: targetChain.id });
        } catch (error) {
          console.error('Chain switch failed:', error);
        } finally {
          setTimeout(() => {
            isSyncing.current = false;
          }, 500);
        }
      }
    }

    else if (currentChainName && chainName !== currentChainName) {
      isSyncing.current = true;
      console.log(`Updating URL to ${currentChainName}`);

      router.push(
        { pathname: router.pathname, query: { ...router.query, chain: currentChainName } },
        undefined,
        { shallow: true }
      )
        .finally(() => {
          setTimeout(() => {
            isSyncing.current = false;
          }, 500);
        });
    }
  }, [
    router.isReady,
    isConnected,
    accountChain?.name,
    router.query.chain,
    chains,
    switchChain,
    router
  ]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain: buttonChain,
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
            if (!mounted || !account || !buttonChain) {
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

            if (buttonChain.unsupported) {
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
                    variant='outline'
                    width='fit'
                    onClick={openChainModal}
                  >
                    <Image
                      alt={buttonChain.name ?? 'Chain icon'}
                      src={buttonChain.iconUrl}
                      width={25}
                      height={25}
                      mr={2}
                    />
                    {buttonChain.name}
                  </Button>

                  <MenuButton
                    as={Button}
                    rightIcon={
                      <Icon as={FiChevronDown} color='brand.primary.600' />
                    }
                    variant='outline'
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
