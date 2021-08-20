import { Flex } from '@chakra-ui/react';
import React from 'react';

export interface CardProps {
  children?: {};
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <Flex
    width='100%'
    direction='column'
    alignItems='center'
    justifyContent='space-evenly'
    py='2rem'
    px='1.5rem'
    bg='black'
    borderTop='2px solid'
    borderColor='red'
  >
    {children}
  </Flex>
);
