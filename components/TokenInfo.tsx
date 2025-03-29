import React from 'react';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import useBalances from '../hooks/useBalances';

export interface TokenInfoProps {
  deposit: boolean;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ deposit }) => {
  const { chain } = useAccount();
  const { ethBalance, wethBalance } = useBalances();

  const symbol = chain?.nativeCurrency?.symbol;

  return (
    <Button variant='secondary' className='uppercase rounded-xs pointer-events-none'>
      {`${deposit ? '' : 'W'}${symbol} Balance: ${deposit ? ethBalance?.slice(0, 6) || 0 : wethBalance?.slice(0, 6) || 0
        }`}
    </Button>
  );
};

export default TokenInfo;
