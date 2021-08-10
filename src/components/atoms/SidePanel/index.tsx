import { Center } from '@chakra-ui/react';
import React from 'react';

export interface SidePanelProps {
  /**
   * Objects to render in pabel
   */
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
export const SidePanel: React.FC<SidePanelProps> = ({ children }) => {
  return (
    <Center top='50%' pointerEvents='none' z-index='0'>
      {children}
    </Center>
  );
};
