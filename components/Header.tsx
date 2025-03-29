import React from 'react';

// import { Flex } from '@raidguild/design-system';

export interface HeaderProps {
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ children }) => (
  <div
    className='flex flex-col md:flex-row items-center justify-end w-full max-w-[70em] mb-8 p-8'
  >
    {children}
  </div>
);

Header.defaultProps = {
  children: null,
};

export default Header;
