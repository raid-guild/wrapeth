import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  loggedOutDecorator,
  loggedInDecorator,
} from '../../AppContainer/appContainer.stories';
import { setTestUseCurrentUser } from '../../../contexts/currentUserContext';

import { DepositForm, DepositFormProps } from '.';

export default {
  title: 'Components/Molecules/DepositForm',
  component: DepositForm,
} as Meta;

const Template: Story<DepositFormProps> = (args) => <DepositForm {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedOut.decorators = [loggedOutDecorator];

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
LoggedIn.decorators = [loggedInDecorator];
