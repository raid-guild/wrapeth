import '@fontsource/mirza';
import '@fontsource/uncial-antiqua';
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primaryAlpha: {
      // Base colour is at 500
      200: '#ff95ad',
      300: '#ff6788',
      400: '#ff577c',
      500: '#ff3864',
      600: '#ff194c',
      700: '#ff0940',
      800: '#da0030',
    },
  },

  fonts: {
    heading: 'Uncial Antiqua',
    body: 'Mirza',
    mono: 'Inconsolata',
  },

  styles: {
    global: {
      body: {
        color: 'white',
        bg: 'black',
      },
    },
  },

  textStyles: {
    p: {
      textTransform: 'uppercase',
    },
  },

  components: {
    Button: {
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
    },

    Form: {
      defaultProps: {
        width: '90%',
        textAlign: 'left',
        paddingTop: '2em',
        paddingBottom: '2em',
      },
    },

    Input: {
      defaultProps: {
        variant: 'rg',
      },
      parts: ['field'],
      variants: {
        rg: {
          field: {
            color: 'white',
            bg: 'black',
            border: '1px solid',
            borderColor: 'primaryAlpha.500',
            margin: '5px',
          },
        },
      },
    },

    Text: {
      defaultProps: {
        variant: 'rg',
      },
      variants: {
        rg: {
          color: 'white',
          bg: 'black',
          margin: '5px',
          textTransform: 'uppercase',
        },
      },
    },

    Modal: {
      parts: ['dialog'],
      baseStyle: {
        dialog: {
          bg: 'black',
          color: 'primary.500',
          border: '1px solid',
          borderColor: 'primary.800',
        },
      },
    },
  },
});
