import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers([
  'container',
  'body',
  'header',
  'footer',
]);

export const Card = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      background: 'white',
      boxShadow: 'xl',
      backgroundClip: 'border-box',
      borderRadius: 'xl',
      borderWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      wordWrap: 'break-word',
      overflow: 'hidden',
    },
    body: {
      color: 'gray.600',
      py: 4,
      px: 4,
    },
    header: {
      px: 4,
      pt: 4,
      pb: 0,
      fontWeight: 'bold',
      fontSize: 'xl',
      alignItems: 'center',
      textTransform: 'uppercase',
      borderTopRadius: 'md',
    },
    footer: {
      color: 'gray.600',
      py: 4,
      px: 4,
    },
  },
  sizes: {},
  variants: {
    solid: {
      container: {
        background: 'white',
      },
      body: {
        color: 'gray.800',
      },
      footer: {
        color: 'gray.800',
      },
    },
    solidBold: {
      container: {
        background: 'white',
      },
      body: {
        color: 'gray.600',
      },
      header: {
        bg: 'primary.400',
        color: 'white',
        py: 4,
      },
    },
    brand: {
      container: {
        background: 'primary.100',
      },
      body: {
        color: 'gray.800',
      },
    },
    brandBold: {
      container: {
        background: 'primary.400',
      },
      body: {
        color: 'white',
      },
    },
  },
  defaultProps: {
    variant: 'solid',
  },
});
