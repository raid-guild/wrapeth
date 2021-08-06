import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs/blocks';

import { DepositForm, DepositFormProps } from '.';

export default {
  title: 'Components/Molecules/DepositForm',
  component: DepositForm,
} as Meta;

const Template: Story<DepositFormProps> = (args) => <DepositForm {...args} />;

// const mockUser: User = {
//   type: 'web3',
//   attributes: {
//     'custom:account_address': '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
//   },
//   network: '1010101010',
//   username: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
// };

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
