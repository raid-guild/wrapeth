import chainMappings from '@/utils/chainMap';
// import {
//   Box,
//   Button,
//   Flex,
//   HStack,
//   Icon,
//   Image,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
// } from '@raidguild/design-system';
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiKey, FiXCircle } from 'react-icons/fi';
import { truncateAddress } from 'utils/general';
import { useAccount, useChains, useDisconnect, useSwitchChain } from 'wagmi';
import Image from 'next/image';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';

const ConnectWallet: React.FC = () => {
  const { isConnecting, isConnected, chain: accountChain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { openChainModal, chainModalOpen } = useChainModal();
  const chains = useChains();
  const router = useRouter();
  const isSyncing = useRef(false);
  const [lastModalState, setLastModalState] = useState(false);

  useEffect(() => {
    if (lastModalState && !chainModalOpen && isConnected && accountChain) {
      const chainName = chainMappings[accountChain.name];
      if (chainName) {
        isSyncing.current = true;
        router.push(
          { pathname: router.pathname, query: { ...router.query, chain: chainName } },
          undefined,
          { shallow: true }
        ).finally(() => {
          setTimeout(() => {
            isSyncing.current = false;
          }, 500);
        });
      }
    }
    setLastModalState(chainModalOpen);
  }, [chainModalOpen, accountChain, isConnected, router, lastModalState]);

  useEffect(() => {
    if (!router.isReady || !isConnected || !accountChain || isSyncing.current || chainModalOpen) return;
    async function asyncChainSwitch() {
      const chainName = typeof router.query.chain === 'string'
        ? router.query.chain.toLowerCase()
        : null;
      const currentChainName = chainMappings[accountChain?.name ?? ''];
      if (chainName && chainMappings[chainName] && chainMappings[chainName] !== accountChain?.name) {
        const targetChain = chains.find(c => c.name === chainMappings[chainName]);

        if (targetChain) {
          isSyncing.current = true;
          try {
            await switchChain({ chainId: targetChain.id });
          } finally {
            setTimeout(() => {
              isSyncing.current = false;
            }, 500);
          }
        }
      }

      else if (currentChainName && chainName !== currentChainName) {
        isSyncing.current = true;
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
    }
    asyncChainSwitch();
  }, [
    router.isReady,
    isConnected,
    accountChain?.name,
    router.query.chain,
    chains,
    switchChain,
    router,
    chainModalOpen
  ]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain: buttonChain,
        openAccountModal,
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
                  className='bg-purple-600 text-purple-50 rounded-xs transition-all duration-100 ease-in-out hover:bg-purple-600 hover:border-2 hover:border-purple-50'
                  disabled={isConnecting}
                  onClick={openConnectModal}
                  data-cy='connect-wallet'
                  variant='default'
                >
                  <FiKey /> Connect
                </Button>
              );
            }

            if (buttonChain.unsupported) {
              return (
                <Button
                  className='bg-brand-primary-50 text-brand-primary-600 transition-all duration-100 ease-in-out hover:bg-brand-primary-100 hover:border-2 hover:border-brand-primary-600'
                  onClick={openChainModal}
                >
                  Unsupported network
                </Button>
              );
            }

            return (
              <div className='flex gap-2'>
                <Button
                  className='flex width-fit'
                  onClick={openChainModal}
                  variant='outline'
                >
                  <Image
                    className='rounded-full'
                    unoptimized
                    alt={buttonChain.name ?? 'Chain icon'}
                    src={buttonChain.iconUrl ?? ''}
                    width={25}
                    height={25}
                  />
                  {buttonChain.name}
                </Button>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        {account.ensName
                          ? account.ensName
                          : truncateAddress(account.address)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-[150px]">
                          <NavigationMenuLink
                            onClick={() => openAccountModal()}
                            className="hover:bg-gray-600"
                          >
                            <div className='flex items-center gap-2'>
                              <FiKey className='text-white' />
                              <p className='text-white'>Wallet</p>
                            </div>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            onClick={() => disconnect()}
                            className="hover:bg-gray-600"
                          >
                            <div className='flex items-center gap-2'>
                              <FiXCircle className='text-red-300' />
                              <p className='text-red-300'>Sign Out</p>
                            </div>
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            );
          })()}
        </div>
      )
      }
    </ConnectButton.Custom >
  );
};

export default ConnectWallet;
