import { mode } from '@chakra-ui/theme-tools';

export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: '0.5rem',
        boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
        transition: '.25s all ease',
        boxSizing: 'border-box',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
      variants: {
        outline: () => ({
          borderRadius: '0.5rem',
        }),
        brand: (properties: any) => ({
          bg: mode('primary.500', 'primary.400')(properties),
          color: 'white',
          _focus: {
            bg: mode('primary.500', 'primary.400')(properties),
          },
          _active: {
            bg: mode('primary.500', 'primary.400')(properties),
          },
          _hover: {
            bg: mode('primary.600', 'primary.400')(properties),
          },
        }),
        darkBrand: (properties: any) => ({
          bg: mode('primary.900', 'primary.400')(properties),
          color: 'white',
          _focus: {
            bg: mode('primary.900', 'primary.400')(properties),
          },
          _active: {
            bg: mode('primary.900', 'primary.400')(properties),
          },
          _hover: {
            bg: mode('primary.800', 'primary.400')(properties),
          },
        }),
        lightBrand: (properties: any) => ({
          bg: mode('#F2EFFF', 'whiteAlpha.100')(properties),
          color: mode('primary.500', 'white')(properties),
          _focus: {
            bg: mode('#F2EFFF', 'whiteAlpha.100')(properties),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(properties),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(properties),
          },
        }),
        light: (properties: any) => ({
          bg: mode('secondaryGray.300', 'whiteAlpha.100')(properties),
          color: mode('secondaryGray.900', 'white')(properties),
          _focus: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(properties),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(properties),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(properties),
          },
        }),
        action: (properties: any) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('secondaryGray.300', 'primary.400')(properties),
          color: mode('primary.500', 'white')(properties),
          _focus: {
            bg: mode('secondaryGray.300', 'primary.400')(properties),
          },
          _active: { bg: mode('secondaryGray.300', 'primary.400')(properties) },
          _hover: {
            bg: mode('secondaryGray.200', 'primary.400')(properties),
          },
        }),
        setup: (properties: any) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('transparent', 'primary.400')(properties),
          border: mode('1px solid', '0px solid')(properties),
          borderColor: mode('secondaryGray.400', 'transparent')(properties),
          color: mode('secondaryGray.900', 'white')(properties),
          _focus: {
            bg: mode('transparent', 'primary.400')(properties),
          },
          _active: { bg: mode('transparent', 'primary.400')(properties) },
          _hover: {
            bg: mode('secondaryGray.100', 'primary.400')(properties),
          },
        }),
      },
    },
  },
};
