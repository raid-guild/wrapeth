import { Center } from '@chakra-ui/react';
import React from 'react';

export interface FooterProps {
  children?: {};
}

export const Footer: React.FC<FooterProps> = ({ children }) => (
  <Center bottom='15px' w='100%'>
    {children}
  </Center>
);
