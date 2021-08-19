export const Button = {
  defaultProps: {
    colorScheme: 'primaryAlpha',
    variant: 'solid',
    fontWeight: '400',
  },
  variants: {
    solid: () => ({
      textTransform: 'uppercase',
    }),
    outline: () => ({
      textTransform: 'uppercase',
    }),
  },
};
