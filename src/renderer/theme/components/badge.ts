import { mode } from '@chakra-ui/theme-tools';

export const badgeStyles = {
  components: {
    Badge: {
      baseStyle: {
        borderRadius: '10px',
        lineHeight: '100%',
        padding: '7px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
      variants: {
        outline: () => ({
          borderRadius: '16px',
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
      },
    },
  },
};
