import cn from '@/lib/utils';
import chainMappings from '@/utils/chainMap';
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FiKey, FiXCircle } from 'react-icons/fi';
import { truncateAddress } from 'utils/general';
import { useAccount, useChains, useDisconnect, useSwitchChain } from 'wagmi';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu';

const ConnectWallet: React.FC = () => {
  const { isConnecting, isConnected, chain: accountChain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { openChainModal, chainModalOpen } = useChainModal();
  const chains = useChains();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSyncing = useRef(false);
  const [lastModalState, setLastModalState] = useState(false);

  useEffect(() => {
    if (lastModalState && !chainModalOpen && isConnected && accountChain) {
      const chainName = chainMappings[accountChain.id];
      if (chainName) {
        isSyncing.current = true;
        const params = new URLSearchParams(searchParams);
        params.set('chain', chainName);
        router.push(`?${params.toString()}`);
        setTimeout(() => {
          isSyncing.current = false;
        }, 500);
      }
    }
    setLastModalState(chainModalOpen);
  }, [
    chainModalOpen,
    accountChain,
    isConnected,
    router,
    lastModalState,
    searchParams
  ]);

  useEffect(() => {
    if (!isConnected || !accountChain || isSyncing.current || chainModalOpen)
      return;

    async function asyncChainSwitch() {
      const chainName = searchParams.get('chain')?.toLowerCase() || null;
      const currentChainName = chainMappings[accountChain?.id ?? ''];

      if (
        chainName &&
        chainMappings[chainName] &&
        chainMappings[chainName] !== accountChain?.id
      ) {
        const targetChain = chains.find(
          (c) => c.id === chainMappings[chainName]
        );
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
      } else if (currentChainName && chainName !== currentChainName) {
        isSyncing.current = true;
        const params = new URLSearchParams(searchParams);
        params.set('chain', currentChainName);
        router.push(`?${params.toString()}`);
        setTimeout(() => {
          isSyncing.current = false;
        }, 500);
      }
    }
    asyncChainSwitch();
  }, [
    isConnected,
    accountChain?.name,
    searchParams,
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
        mounted
      }) => (
        <div
          {...(!mounted && {
            'aria-hidden': true
          })}
          className={cn(
            !mounted ? 'pointer-events-none opacity-0 select-none' : ''
          )}
        >
          {(() => {
            if (!mounted || !account || !buttonChain) {
              return (
                <Button
                  className='rounded-xs bg-purple-600 text-purple-50 uppercase transition-all duration-100 ease-in-out hover:border-2 hover:border-purple-50 hover:bg-purple-600'
                  disabled={mounted ? isConnecting : false}
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
                  className='bg-brand-primary-50 text-brand-primary-600 hover:bg-brand-primary-100 hover:border-brand-primary-600 rounded-xs uppercase transition-all duration-100 ease-in-out hover:border-2'
                  onClick={openChainModal}
                >
                  Unsupported network
                </Button>
              );
            }

            return (
              <div className='flex items-center gap-2'>
                <Button
                  className='width-fit flex uppercase'
                  onClick={openChainModal}
                  variant='outline'
                >
                  {buttonChain.iconUrl && (
                    <Image
                      className='rounded-full'
                      unoptimized
                      alt={buttonChain.name ?? 'Chain icon'}
                      src={buttonChain.iconUrl ?? ''}
                      width={25}
                      height={25}
                    />
                  )}
                  {buttonChain.name}
                </Button>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className='uppercase'>
                        {account.ensName
                          ? account.ensName
                          : truncateAddress(account.address)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='w-[150px]'>
                          <NavigationMenuLink
                            onClick={() => openAccountModal()}
                            className='select-none hover:bg-gray-600'
                          >
                            <div className='flex items-center gap-2'>
                              <FiKey className='text-white' />
                              <p className='text-white'>Wallet</p>
                            </div>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            onClick={() => disconnect()}
                            className='select-none hover:bg-gray-600'
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
      )}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
