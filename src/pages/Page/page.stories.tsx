import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Page, PageProps } from '.';

export default {
  title: 'Pages/Page',
  component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = { children: undefined };
