import React from 'react';

export interface HeaderProps {
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ children }) => (
  <div className='mb-8 flex w-full max-w-[70em] flex-col items-center justify-end p-8 md:flex-row'>
    {children}
  </div>
);

Header.defaultProps = {
  children: null
};

export default Header;
