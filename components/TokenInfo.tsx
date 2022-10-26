import { Button } from '@raidguild/design-system';
import { useNetwork } from 'wagmi';
import useBalances from '../hooks/useBalances';

export interface TokenInfoProps {
  deposit: boolean;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ deposit }) => {
  const { chain } = useNetwork();
  const { ethBalance, wethBalance } = useBalances();

  const symbol = chain?.nativeCurrency?.symbol;

  return (
    <Button variant='ghost'>
      {`${deposit ? '' : 'W'}${symbol} Balance: ${
        deposit ? ethBalance?.substr(0, 6) || 0 : wethBalance?.substr(0, 6) || 0
      }`}
    </Button>
  );
};

export default TokenInfo;
