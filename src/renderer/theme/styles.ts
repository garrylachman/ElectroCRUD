import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    gradient: {
      perper: {
        100: 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)',
        200: 'linear-gradient(290.56deg, rgb(134, 140, 255) -18.35%, rgb(67, 24, 255) 60.45%)',
        300: 'linear-gradient(135deg, rgb(134, 140, 255) 0%, rgb(67, 24, 255) 100%)',
      },
      red: {
        100: 'linear-gradient(108.54deg, rgb(255, 65, 108) 6.56%, rgb(255, 75, 43) 95.2%)',
      },
      orange: {
        100: 'linear-gradient(293.45deg, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 92.27%)',
      },
      white: {
        100: 'linear-gradient(rgb(244, 247, 254) 0%, rgba(244, 247, 254, 0) 86.56%)',
        200: 'linear-gradient(rgb(244, 247, 254) 0%, rgba(244, 247, 254, 0) 90%)',
        300: 'linear-gradient(rgb(244, 247, 254) 0%, rgba(244, 247, 254, 0) 95%)',
        400: 'linear-gradient(rgb(244, 247, 254) 0%, rgba(244, 247, 254, 0) 98%)',
        500: 'linear-gradient(to right, rgba(0, 210, 255, 0.1), rgba(146, 141, 171, 0.05))',
        600: 'linear-gradient(to right, rgb(244, 247, 254) 0%, rgba(244, 247, 254, 0.3))',
      },
    },
    brand: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#11047A',
    },
    brandScheme: {
      100: '#E9E3FF',
      200: '#7551FF',
      300: '#7551FF',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A',
    },
    brandTabs: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#422AFB',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A',
    },
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559',
      1000: '#edf3f8',
      1100: '#3e3e3e',
    },
    red: {
      100: '#FEEFEE',
      500: '#EE5D50',
      600: '#E31A1A',
    },
    blue: {
      50: '#EFF4FB',
      500: '#3965FF',
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547',
    },
    green: {
      100: '#E6FAF5',
      500: '#01B574',
    },
    navy: {
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111c44',
      900: '#0b1437',
    },
    gray: {
      100: '#FAFCFE',
    },
  },
  styles: {
    global: (properties: any) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('#fdfeff', 'navy.900')(properties),
        fontFamily: 'Poppins',
        '-webkit-font-smoothing': 'antialiased',
      },
      input: {
        color: 'gray.700',
      },
      html: {
        fontFamily: 'Poppins',
      },
    }),
  },
};
