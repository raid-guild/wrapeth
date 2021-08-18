import React from 'react';
import { Image, Flex, Spacer } from '@chakra-ui/react';
import { Story, Meta } from '@storybook/react';
import logo from '../../../assets/wrapeth_logo.png';
import { SidePanel, SidePanelProps } from '.';

export default {
  title: 'Components/Atoms/SidePanel',
  component: SidePanel,
  argTypes: {
    width: { control: 'number' },
  },
} as Meta;

const Template: Story<SidePanelProps> = (args) => <SidePanel {...args} />;

export const WithLogoLeft = Template.bind({});
WithLogoLeft.args = {
  children: (
    <Flex>
      <Image src={logo} alt='wrapeth logo' max-width='240px' height='auto' />
      <Spacer />
    </Flex>
  ),
};

export const WithLogoRight = Template.bind({});
WithLogoRight.args = {
  children: (
    <Flex>
      <Spacer />
      <Image src={logo} alt='wrapeth logo' max-width='240px' height='auto' />
    </Flex>
  ),
};

export const Empty = Template.bind({});
Empty.args = {};
