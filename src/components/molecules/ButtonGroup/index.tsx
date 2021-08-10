import React, { useState } from 'react';

import { Button, ButtonGroup as CButtonGroup } from '@chakra-ui/button';

export interface ButtonGroupProps {
  /**
   * Provide the list of buttons
   */
  buttons: string[];
  /**
   * Provide the default selected value
   */
  defaultSelected?: number;
  /**
   * Display the buttons as a single entity
   */
  isAttached?: boolean;
  /**
   * How large should the buttons be?
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Function to call when button is selected
   */
  // eslint-disable-next-line no-unused-vars
  onSelect: (index: number) => void;
}

/**
 * Container for grouping and wrapping buttons - can be used for toggles
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  defaultSelected = 0,
  size = 'md',
  isAttached = true,
  onSelect,
  ...props
}) => {
  const [selected, setSelected] = useState<number>(defaultSelected);

  const handleSelection = (index: number) => {
    setSelected(index);
    onSelect(index);
  };

  return (
    <CButtonGroup isAttached={isAttached}>
      {buttons.map((label: string, i: number) => {
        return (
          <Button
            key={i}
            variant={i === selected ? 'solid' : 'outline'}
            size={size}
            onClick={() => handleSelection(i)}
            {...props}
          >
            {label}
          </Button>
        );
      })}
    </CButtonGroup>
  );
};
