import { mode } from '@chakra-ui/theme-tools';

const Card = {
  baseStyle: (props: any) => ({
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    borderRadius: '0.5rem',
    minWidth: '0px',
    wordWrap: 'break-word',
    bg: mode('#ffffff', 'gray.800')(props),
    boxShadow: mode('lg')(props),
    backgroundClip: 'border-box',
  }),
  variants: {
    outline: () => ({
      borderRadius: '0.5rem',
    }),
    brand: (props: any) => ({
      bg: mode('brand.500', 'brand.400')(props),
      color: 'white',
    }),
    darkBrand: (props: any) => ({
      bg: mode('brand.900', 'brand.400')(props),
      color: 'white',
    }),
    lightBrand: (props: any) => ({
      bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
      color: mode('brand.500', 'white')(props),
    }),
    light: (props: any) => ({
      bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      color: mode('secondaryGray.900', 'white')(props),
    }),
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};
