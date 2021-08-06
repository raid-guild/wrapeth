import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs/blocks';

import { ButtonGroup, ButtonGroupProps } from '.';

export default {
  title: 'Components/Molecules/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    isAttached: { control: 'boolean' },
    // buttons: {
    //   options: ['One', 'Two', 'Three', 'Four'],
    //   control: { type: 'check' },
    // },
    spacing: { control: 'number' },
    size: { options: ['xs', 'sm', 'md', 'lg'], control: { type: 'radio' } },
  },
} as Meta;

const Template: Story<ButtonGroupProps> = (args) => <ButtonGroup {...args} />;

export const Attached = Template.bind({});
Attached.args = {
  buttons: ['Tic', 'Tac', 'Toe'],
  isAttached: true,
};

export const Spaced = Template.bind({});
Spaced.args = {
  buttons: ['Pinapple', 'Pen'],
  isAttached: false,
};
