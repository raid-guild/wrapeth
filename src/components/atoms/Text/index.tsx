import React from 'react';
import { Text as CText } from '@chakra-ui/react';

export interface TextProps {
  /**
   * Text content
   */
  content: string;
  /**
   * What text color to use
   */
  color?: string;
  /**
   * Truncate the text and end with elipsis on limit
   */
  truncated?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg' | '2xl' | '4xl' | '6xl';
}

/**
 * Primary UI component for text
 */
export const Text: React.FC<TextProps> = ({
  size,
  color,
  content,
  truncated,
  ...props
}) => {
  return (
    <CText fontSize={size} isTruncated={truncated} color={color} {...props}>
      {content}
    </CText>
  );
};
