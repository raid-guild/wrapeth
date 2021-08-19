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
