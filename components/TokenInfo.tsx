import React from 'react';
import { Button } from '@raidguild/design-system';
import { useAccount } from 'wagmi';
import useBalances from '../hooks/useBalances';

export interface TokenInfoProps {
  deposit: boolean;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ deposit }) => {
  const { chain } = useAccount();
  const { ethBalance, wethBalance } = useBalances();

  const symbol = chain?.nativeCurrency?.symbol;

  return (
    <Button variant='ghost'>
      {`${deposit ? '' : 'W'}${symbol} Balance: ${deposit ? ethBalance?.slice(0, 6) || 0 : wethBalance?.slice(0, 6) || 0
        }`}
    </Button>
  );
};

export default TokenInfo;
