import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';

import { Footer, FooterProps } from '.';
import { Button, Text } from '@chakra-ui/react';

export default {
  title: 'Components/Atoms/Footer',
  component: Footer,
} as Meta;

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const WithButton = Template.bind({});
WithButton.args = {
  children: <Button label='Button' />,
};

export const WithButtonAndText = Template.bind({});
WithButtonAndText.args = {
  children: (
    <Fragment>
      <Button>Button</Button>
      <Text>This is some text</Text>
    </Fragment>
  ),
};

export const Empty = Template.bind({});
Empty.args = {};
