import { extendTheme } from '@chakra-ui/react';

export const configTheme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'green.600',
          color: 'white',
          _hover: {
            bg: 'green.600',
            opacity: 0.9,
          },
        },
      },
    },
  },
});
