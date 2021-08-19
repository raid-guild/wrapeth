import '@fontsource/mirza';
import '@fontsource/uncial-antiqua';
import { extendTheme } from '@chakra-ui/react';
import { Button } from './components/Button';
import { Form } from './components/Form';
import { Input } from './components/Input';
import { Modal } from './components/Modal';
import { Text } from './components/Text';

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    blackDark: 'rgba(10, 10, 10, 0.960784)',
    blackLight: '#2b2c34',
    blackLighter: '#16161a',
    greyLight: '#a7a9be',
    greyDark: '#4a4a4a',
    white: '#fffffe',
    purple: '#822EA6',
    purpleLight: '#B66AD6',
    yellow: '#F2E857',
    yellowDark: '#DCCF11',
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
    Button,
    Form,
    Input,
    Text,
    Modal,
  },
});
