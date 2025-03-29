import React, { useState } from 'react';
// import {
//   Heading,
//   Card,
//   Container,
//   Flex,
//   Spacer,
//   ButtonGroup,
//   BuiltByRaidGuild,
// } from '@raidguild/design-system';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi';
import WrapperForm from '@/components/WrapperForm';
import Header from '@/components/Header';
import ConnectWallet from '@/components/ConnectWallet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AppProps {
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
const App: React.FC<AppProps> = ({ children }: AppProps) => {
  const [deposit, setDeposit] = useState<boolean>(true);
  const { isConnected, chain } = useAccount();

  const onButtonSelection = (index: number) => {
    switch (index) {
      case 0:
        setDeposit(true);
        break;
      case 1:
        setDeposit(false);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`Invalid input: ${index}`);
    }
  };

  return (
    <div className='h-screen w-screen max-w-full bg-background overflow-auto'>
      <div className='container mx-auto max-w-[80ch]'>
        <Header>
          <ConnectWallet />
        </Header>
        <div className='flex items-center mt-10'>
          <h1 className='font-uncial text-4xl'>Wrap Eth</h1>
        </div>
        <Card className='mt-24 p-32 w-full border-2 border-white rounded-xs'>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => onButtonSelection(0)}
              className={cn(
                'pointer rounded-r-none',
                deposit ? 'bg-primary' : 'bg-secondary',
              )}
            >
              Wrap ${chain?.nativeCurrency?.symbol || 'ETH'}
            </Button>
            <Button
              onClick={() => onButtonSelection(1)}
              className={cn(
                'pointer rounded-l-none',
                deposit ? 'bg-secondary' : 'bg-primary',
              )}
            >
              Unwrap w${chain?.nativeCurrency?.symbol || 'ETH'}
            </Button>
          </div>

          {isConnected ? (
            // <WrapperForm action={deposit ? 'deposit' : 'withdraw'} />
            <h1> Wrap ETH </h1>
          ) : (
            <h1 className='mt-5 text-lg text-white'>
              Connect to {deposit ? 'wrap' : 'unwrap'} ETH
            </h1>
          )}
        </Card>

        {/* <Flex justify='flex-end' width='100%' my='6' mr='48px'>
          <BuiltByRaidGuild />
        </Flex> */}
      </div>
      {children}
    </div>
  );
};

App.defaultProps = {
  children: null,
};

export default App;
