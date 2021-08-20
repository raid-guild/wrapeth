import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs/blocks';

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
  // position: 'left',
};

export const WithLogoRight = Template.bind({});
WithLogoRight.args = {
  // position: 'right',
};

export const Empty = Template.bind({});
Empty.args = {};
