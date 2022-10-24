import React from 'react';
import { Button } from '@raidguild/design-system';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/popover';
import { useNetwork } from 'wagmi';
import { unitConverter } from 'utils/unitConverter';

export interface TokenInfoProps {
  /**
   * Deposit or withdraw form?
   */
  deposit: boolean;
  ethBalance: number;
  wethBalance: number;
  gasLimit: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  deposit,
  ethBalance,
  wethBalance,
  gasLimit,
}) => {
  const { chain } = useNetwork();

  // const gasEstimate = unitConverter(gasLimit);
  const gwei = Number(gasLimit.gwei).toFixed(2);
  const ether = Number(gasLimit.ether).toFixed(12);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='ghost'>
          {`${deposit ? '' : 'W'}${chain?.nativeCurrency?.symbol} Balance: ${
            deposit ? ethBalance.toFixed(6) : wethBalance.toFixed(6)
          }`}
        </Button>
      </PopoverTrigger>
      <PopoverContent color='darkgray'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody
          color='#8B1DB6'
          fontWeight='semibold'
          bg='none'
          opacity='100'
        >
          Gas Limit: {gwei} gwei ({ether} ether)
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TokenInfo;
