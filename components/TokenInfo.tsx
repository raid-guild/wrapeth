import { Button } from '@raidguild/design-system';
// import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/popover';
import { useNetwork } from 'wagmi';
import useBalances from '../hooks/useBalances';

export interface TokenInfoProps {
  /**
   * Deposit or withdraw form?
   */
  deposit: boolean;
  gasLimit: any;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  deposit,
  // gasLimit,
}) => {
  const { chain } = useNetwork();
  const { ethBalance, wethBalance } = useBalances();

  const symbol = chain?.nativeCurrency?.symbol;

  return (
    // <Popover>
    //   <PopoverTrigger>
    <Button variant='ghost'>
      {`${deposit ? '' : 'W'}${symbol} Balance: ${
        deposit ? ethBalance?.substr(0, 6) || 0 : wethBalance?.substr(0, 6) || 0
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
