import React, { useState, useEffect } from 'react';
import {
  Heading,
  Card,
  Container,
  Flex,
  Spacer,
  ButtonGroup,
  BuiltByRaidGuildComponent,
} from '@raidguild/design-system';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useNetwork } from 'wagmi';
import { WrapperForm } from 'components';
import { Header } from 'components';
import { ConnectWallet } from 'components';
import '@fontsource/uncial-antiqua';

export interface AppProps {
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
const App: React.FC<AppProps> = ({ children }) => {
  const [deposit, setDeposit] = useState<boolean>(true);
  const [_isConnected, _setIsConnected] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const onButtonSelection = (index: number) => {
    switch (index) {
      case 0:
        setDeposit(true);
        break;
      case 1:
        setDeposit(false);
        break;
      default:
        console.log(`Invalid input: ${index}`);
    }
  };

  useEffect(() => {
    if (isConnected) {
      _setIsConnected(true);
    } else {
      _setIsConnected(false);
    }
  }, []);

  return (
    <>
      <Flex h='100vh' w='100vw' maxW='100%'>
        <Container centerContent maxW='80ch'>
          <Header>
            <Spacer />
            <ConnectWallet />
          </Header>
          <Flex align='center' mt='10px'>
            <Heading as='h1' size='4xl' variant='shadow' content='Wrap Eth' />
          </Flex>
          <Container centerContent maxW='80ch'>
            <Card mt='24px' p='64px' w='100%' background='gray.800'>
              <ButtonGroup
                buttons={[
                  `Wrap ${chain?.nativeCurrency?.symbol || 'ETH'}`,
                  `Unwrap w${chain?.nativeCurrency?.symbol || 'ETH'}`,
                ]}
                defaultSelected={deposit ? 0 : 1}
                isAttached
                onSelect={onButtonSelection}
              />

              {_isConnected ? (
                <WrapperForm action={deposit ? 'deposit' : 'withdraw'} />
              ) : (
                <Heading
                  color='whiteAlpha.900'
                  variant='noShadow'
                  mt={5}
                  size='lg'
                >
                  Connect to {deposit ? 'wrap' : 'unwrap'} ETH
                </Heading>
              )}
            </Card>
          </Container>

          <Flex justify='flex-end' width='100%' my='6' mr='48px'>
            <BuiltByRaidGuildComponent />
          </Flex>
        </Container>
        {children}
      </Flex>
    </>
  );
};

export default App;
