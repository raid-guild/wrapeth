import React, { useState } from 'react';

import { Footer } from '../atoms/Footer';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { Header } from '../atoms/Header';
import { SidePanel } from '../atoms/SidePanel';

import { Container, Flex, Spacer, Image, Text } from '@chakra-ui/react';

import footerImage from '../../assets/raidguild_mark.png';
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
    <Flex h='100vh' w='100vw'>
      <SidePanel>
        <Image src={raidGuildLogoLeft} alt='Swords logo' maxH='75vh' />
      </SidePanel>

      <Container centerContent flexDirection='column' width='100%'>
        <Header>
          <Image
            src={logo}
            alt='wrapeth logo'
            max-width='240px'
            height='auto'
          />
          <Spacer />
          <AccountButton />
        </Header>
        <Container centerContent marginTop='10px'>
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
              <Text>Connect to Wrap {networkName}</Text>
            )
          ) : currentUser?.username ? (
            <WithdrawForm />
          ) : (
            <Text>Connect to Unwrap w{networkName}</Text>
          )}
        </Container>

        <Spacer />

        <Footer>
          <Image src={footerImage} alt='Created by Raid Guild' />
        </Footer>
      </Container>

      <SidePanel>
        <Image src={raidGuildLogoRight} alt='Swords logo' maxH='75vh' />
      </SidePanel>
      {children}
    </Flex>
  );
};
