import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, CardProps } from '.';
import { Heading } from '@chakra-ui/react';

export default {
  title: 'Components/Atoms/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const WithHeading = Template.bind({});
WithHeading.args = {
  children: (
    <Heading
      variant='label'
      fontSize={{ base: '16px' }}
      mb={5}
      textAlign='center'
    >
      Card Title
    </Heading>
  ),
};

export const Empty = Template.bind({});
Empty.args = {};
