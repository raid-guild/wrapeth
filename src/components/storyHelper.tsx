import React from 'react';
import { setTestUseCurrentUser } from '../contexts/currentUserContext';
import { Story } from '@storybook/react';

const mockGetter = () => {
  return {
    currentUser: {
      type: 'web3',
      attributes: { 'custom:account_address': '111' },
      network: { chain: 'demoETH' },
      username: '0x1234567',
      ethBalance: 1.1,
      wethBalance: 2.2,
    },
    setCurrentUser: () => {},
  };
};

export const loggedOutDecorator = (StoryInst: Story) => {
  setTestUseCurrentUser(mockGetter, true);
  return <StoryInst />;
};

export const loggedInDecorator = (StoryInst: Story) => {
  setTestUseCurrentUser(mockGetter, false);
  return <StoryInst />;
};
