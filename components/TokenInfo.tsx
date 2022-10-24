import React from 'react';
import { Button } from '@raidguild/design-system';
// import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/popover';
import { useNetwork } from 'wagmi';

export interface TokenInfoProps {
  /**
   * Deposit or withdraw form?
   */
  deposit: boolean;
  ethBalance: number;
  wethBalance: number;
  gasLimit: any;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  deposit,
  ethBalance,
  wethBalance,
  gasLimit,
}) => {
  const { chain } = useNetwork();
  const symbol = chain?.nativeCurrency?.symbol;

  // const gwei = Number(gasLimit.gwei).toFixed(2);
  // const ether = Number(gasLimit.ether).toFixed(12);

  return (
    // <Popover>
    //   <PopoverTrigger>
    <Button variant='ghost'>
      {`${deposit ? '' : 'W'}${symbol} Balance: ${
        deposit ? ethBalance.toFixed(6) : wethBalance.toFixed(6)
      }`}
    </Button>
    // </PopoverTrigger>
    // <PopoverContent color='darkgray'>
    // <PopoverArrow />
    // <PopoverCloseButton />
    // <PopoverBody
    // color='#8B1DB6'
    // fontWeight='semibold'
    // bg='none'
    // opacity='100'
    // >
    // Gas estimate: {gasLimit} ether
    // </PopoverBody>
    // </PopoverContent>
    // </Popover>
  );
};

export default TokenInfo;
