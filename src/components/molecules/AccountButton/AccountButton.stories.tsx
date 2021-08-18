import React from 'react';
import { Story, Meta } from '@storybook/react';
import { loggedOutDecorator, loggedInDecorator } from '../../storyHelper';

import { AccountButton, AccountButtonProps } from '.';

export default {
  title: 'Components/Molecules/AccountButton',
  component: AccountButton,
} as Meta;

const Template: Story<AccountButtonProps> = (args) => (
  <AccountButton {...args} />
);

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedOut.decorators = [loggedOutDecorator];

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
LoggedIn.decorators = [loggedInDecorator];
