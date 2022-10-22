import React from 'react';

import { Flex } from '@raidguild/design-system';

export interface HeaderProps {
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ children }) => (
  <Flex
    direction={['column', 'row']}
    align='center'
    justify={['space-between', 'center']}
    wrap='wrap'
    w='100vw'
    maxW='70em'
    mb={8}
    p={8}
  >
    {children}
  </Flex>
);

export default Header;
