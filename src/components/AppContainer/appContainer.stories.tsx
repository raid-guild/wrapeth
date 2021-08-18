/* eslint-disable prettier/prettier */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AppContainer, AppContainerProps } from '.';
import { loggedOutDecorator, loggedInDecorator } from '../storyHelper';

export default {
  title: 'Components/App/AppContainer',
  component: AppContainer,
} as Meta;

const ControlledTemplate: Story<AppContainerProps> = (args) => (
  <AppContainer {...args} />
);

const Template: Story<AppContainerProps> = (args) => <AppContainer {...args} />;

export const WalletConnected = ControlledTemplate.bind({});
WalletConnected.args = {
  // backgroundColor: 'white',
};

WalletConnected.decorators = [loggedInDecorator];

export const WalledDisconnected = Template.bind({});
WalledDisconnected.args = {
  // backgroundColor: 'black',
};

WalledDisconnected.decorators = [loggedOutDecorator];
