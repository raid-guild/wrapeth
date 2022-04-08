import React, { useState } from 'react';
import {
  Heading,
  Card,
  Container,
  Flex,
  Spacer,
  ButtonGroup,
  BuiltByRaidGuildComponent,
} from '@raidguild/design-system';

import { AccountButton, WrapperForm, Header } from './components';
import { useCurrentUser } from 'contexts/currentUserContext';
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
  const { currentUser } = useCurrentUser();

  const [deposit, setDeposit] = useState<boolean>(true);

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

  const networkName: string =
    currentUser?.network?.chain !== undefined
      ? currentUser?.network?.chain
      : '';

  return (
    <Flex h='100vh' w='100vw' maxW='100%'>
      <Container centerContent maxW='80ch'>
        <Header>
          <Spacer />
          <AccountButton />
        </Header>
        <Flex align='center' mt='10px'>
          <Heading as='h1' size='4xl' variant='shadow' content='Wrap Eth' />
        </Flex>
        <Container centerContent maxW='80ch'>
          <Card mt='24px' p='64px' w='100%'>
            <ButtonGroup
              buttons={[
                `Wrap ${networkName || 'ETH'}`,
                `Unwrap w${networkName || 'ETH'}`,
              ]}
              defaultSelected={deposit ? 0 : 1}
              isAttached
              onSelect={onButtonSelection}
            />
            {currentUser?.username ? (
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
            )}
          </Card>
        </Container>

        <Flex justify='flex-end' width='100%' my='6' mr='48px'>
          <BuiltByRaidGuildComponent />
        </Flex>
      </Container>

      {children}
    </Flex>
  );
};

export default App;
