import { Flex } from '@chakra-ui/react';
import React from 'react';

export interface CardProps {
  children?: {};
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <Flex
    maxWidth='500px'
    direction='column'
    alignItems='center'
    justifyContent='space-evenly'
    py='2rem'
    px='1.5rem'
    bg='blackLighter'
    borderTop='2px solid'
    borderColor='red'
  >
    {children}
  </Flex>
);
