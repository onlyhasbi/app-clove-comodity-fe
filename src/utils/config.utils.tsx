import { extendTheme } from '@chakra-ui/react';

export const configTheme = extendTheme({
  colors: {
    brand: {
      100: '#548c31',
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.100',
          color: 'white',
          _hover: {
            bg: 'brand.100',
            opacity: 0.9,
          }
        }
      }
    }
  }
});
