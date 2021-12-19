import React from 'react';
import { Story, Meta } from '@storybook/react';

import App, { AppProps } from 'App';

export default {
  title: 'Components/App',
  component: App,
} as Meta;

const Template: Story<AppProps> = (args) => <App {...args} />;

export const Light = Template.bind({});
Light.args = {
  // backgroundColor: 'white',
};

export const Dark = Template.bind({});
Dark.args = {
  // backgroundColor: 'black',
};
