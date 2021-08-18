/* eslint-disable prettier/prettier */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AppContainer, AppContainerProps } from '.';
import { setTestUseCurrentUser } from '../../contexts/currentUserContext';

const mockGetter = () => {
  return {
    currentUser: {
      type: 'web3',
      attributes: { 'custom:account_address': '111' },
      network: { chain: 'demoETH' },
      username: '0x1234567',
      ethBalance: 1.1,
      wethBalance: 2.2,
    },
    setCurrentUser: () => {},
  }
};

export default {
  title: 'Components/App/AppContainer',
  component: AppContainer,
} as Meta;

const ControlledTemplate: Story<AppContainerProps> = (args) => <AppContainer {...args} />;

const Template: Story<AppContainerProps> = (args) => <AppContainer {...args} />;

export const WalletConnected = ControlledTemplate.bind({});
WalletConnected.args = {
  // backgroundColor: 'white',
};

WalletConnected.decorators = [
  (Story) => {
    setTestUseCurrentUser(mockGetter);
    return <Story />
  }
]

export const WalledDisconnected = Template.bind({});
WalledDisconnected.args = {
  // backgroundColor: 'black',
};

WalledDisconnected.decorators = [
  (Story) => {
    setTestUseCurrentUser(mockGetter, true);
    return <Story />
  }
]
