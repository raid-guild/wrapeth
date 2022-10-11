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
import { useAccount, useNetwork, useContract, useSigner } from 'wagmi';
import { WrapperForm, Header, ConnectWallet } from './components';
import { wethAddrs } from 'utils/contracts';
import WethAbi from 'contracts/wethAbi.json';
import { ethers } from 'ethers';
import '@fontsource/uncial-antiqua';

export interface AppProps {
  /**
   * The components to render within the app container
   */
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
const App: React.FC<AppProps> = ({ children }) => {
  const [deposit, setDeposit] = useState<boolean>(true);
  const [contract, setContract] = useState<any>();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const network: any = chain?.network;
  const chainAddress: any = isConnected ? wethAddrs[network] : null;
  const abi: any = WethAbi;

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

  const networkName: string = network ? network : '';

  useEffect(() => {
    // Get contract data:
    const fetchContract: any = async () => {
      console.log(chain?.network);
      try {
        const contractInstance: any = await useContract({
          addressOrName: chainAddress,
          contractInterface: abi,
          // signerOrProvider: signer,
        });
        setContract(contractInstance);
        console.log(contract);
      } catch (error) {
        console.log(error);
      }
      return;
    };
    isConnected ? fetchContract() : null;
  }, [chain]);

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
              {/* {isConnected ? (
              deposit ? (
                <WrapperForm action='deposit' />
              ) : (
                <WrapperForm action='withdraw' />
              )
            ) : (
              <Heading
                color='whiteAlpha.900'
                variant='noShadow'
                mt={5}
                size='lg'
              >
                Connect to {deposit ? 'wrap' : 'unwrap'}{' '}
                {networkName || deposit ? 'ETH' : 'WETH'}
              </Heading>
            )} */}
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
