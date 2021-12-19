import React from 'react';
import { addDecorator } from '@storybook/react';
import { RGThemeProvider } from '@raidguild/design-system';

export const Chakra = ({ children }) => (
  <RGThemeProvider>{children}</RGThemeProvider>
);

addDecorator((StoryFn) => (
  <Chakra>
    <StoryFn />
  </Chakra>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
