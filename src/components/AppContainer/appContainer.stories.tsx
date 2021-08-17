/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { AppContainer, AppContainerProps } from '.';
import { setTestUseCurrentUser } from '../../contexts/currentUserContext';

const mockGetter = () => {
  console.log('mock Getter') //eslint-disable-line
  return {
    currentUser: {
      type: 'web3',
      attributes: { 'custom:account_address': '111' },
      network: { chain: 'demoETH' },
      username: 'Demo',
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

export const Light = ControlledTemplate.bind({});
Light.args = {
  // backgroundColor: 'white',
};

Light.decorators = [
  (Story) => {
    console.log('effect light'); //eslint-disable-line
    setTestUseCurrentUser(mockGetter);
    return <Story />
  }
]

export const Dark = Template.bind({});
Dark.args = {
  // backgroundColor: 'black',
};

Dark.decorators = [
  (Story) => {
    console.log('effect dark'); //eslint-disable-line
    setTestUseCurrentUser(mockGetter, true);
    return <Story />
  }
]
