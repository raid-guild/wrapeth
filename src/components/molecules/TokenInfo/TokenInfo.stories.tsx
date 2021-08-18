import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  loggedOutDecorator,
  loggedInDecorator,
} from '../../AppContainer/appContainer.stories';
import { TokenInfo, TokenInfoProps } from '.';

export default {
  title: 'Components/Molecules/TokenInfo',
  component: TokenInfo,
} as Meta;

const Template: Story<TokenInfoProps> = (args) => <TokenInfo {...args} />;

export const Fetching = Template.bind({});
Fetching.args = {};
Fetching.decorators = [loggedOutDecorator];

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
LoggedIn.decorators = [loggedInDecorator];
