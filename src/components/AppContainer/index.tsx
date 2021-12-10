import React, { useState } from 'react';

import { Footer } from '../atoms/Footer';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { Header } from '../atoms/Header';
import { SidePanel } from '../atoms/SidePanel';

import { Box, Container, Flex, Spacer, Image, Text } from '@chakra-ui/react';

import { BuiltByRaidGuild, Heading, Card } from '@raidguild/design-system';

import footerImage from '../../assets/raid-guild-logo.svg';
import raidGuildLogoLeft from '../../assets/raid--left.png';
import raidGuildLogoRight from '../../assets/raid--right.png';
import { AccountButton } from '../molecules/AccountButton';
import logo from '../../assets/wrapeth_logo.png';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { DepositForm } from '../molecules/DepositForm';
import { WithdrawForm } from '../molecules/WithdrawForm';

export interface AppContainerProps {
  /**
   * The components to render within the app container
   */
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
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
        <Box centerContent mt='10px'>
          <Heading as='h1' size='4xl' variant='shadow'>
            Wrap Eth
          </Heading>
        </Box>
        <Container centerContent maxW='80ch'>
          <Card mt='24px' p='64px' w='100%'>
            <ButtonGroup
              buttons={[`Wrap ${networkName}`, `Unwrap w${networkName}`]}
              defaultSelected={deposit ? 0 : 1}
              isAttached
              onSelect={onButtonSelection}
            />
            {deposit ? (
              currentUser?.username ? (
                <DepositForm />
              ) : (
                <Text mt={5}>Connect to Wrap {networkName}</Text>
              )
            ) : currentUser?.username ? (
              <WithdrawForm />
            ) : (
              <Text as='p' mt={5} color='white'>
                Connect to Unwrap w{networkName}
              </Text>
            )}
          </Card>
        </Container>

        <Box width='100%' my='6' mr='48px'>
          <Box float='right'>
            <Text
              as='p'
              fontSize={{ base: '22px' }}
              textAlign='right'
              fontFamily='Uncial Antiqua'
            >
              Brought to you by:
            </Text>
            <BuiltByRaidGuild width='227' height='60' />
          </Box>
        </Box>
      </Container>

      {children}
    </Flex>
  );
};
