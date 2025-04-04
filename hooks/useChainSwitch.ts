'use client';

import { useAccount, useChains, useSwitchChain } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import chainMappings from '@/utils/chainMap';
import { useChainModal } from '@rainbow-me/rainbowkit';

const useChainSwitch = () => {
  const { isConnected, chain: accountChain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { chainModalOpen } = useChainModal();
  const chains = useChains();
  const router = useRouter();
  const pathname = usePathname();
  const [isSyncing, setIsSyncing] = useState(false);

  const updateUrl = useCallback(
    (chainName: string) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('chain', chainName);
      router.push(`${pathname}?${searchParams.toString()}`);
    },
    [router, pathname],
  );

  const handleChainUpdate = useCallback(async () => {
    if (!isConnected || !accountChain || isSyncing || chainModalOpen) return;

    const searchParams = new URLSearchParams(window.location.search);
    const chainName = searchParams.get('chain')?.toLowerCase() || null;
    const currentChainName = chainMappings[accountChain.id];

    if (
      chainName &&
      chainMappings[chainName] &&
      chainMappings[chainName] !== accountChain.id
    ) {
      const targetChain = chains.find((c) => c.id === chainMappings[chainName]);
      if (targetChain) {
        setIsSyncing(true);
        try {
          await switchChain({ chainId: targetChain.id });
          updateUrl(chainName);
        } finally {
          setTimeout(() => setIsSyncing(false), 500);
        }
      }
    } else if (currentChainName && chainName !== currentChainName) {
      setIsSyncing(true);
      updateUrl(currentChainName);
      setTimeout(() => setIsSyncing(false), 500);
    }
  }, [
    isConnected,
    accountChain,
    chainModalOpen,
    chains,
    switchChain,
    updateUrl,
    isSyncing,
  ]);

  return { handleChainUpdate };
};

export default useChainSwitch;
