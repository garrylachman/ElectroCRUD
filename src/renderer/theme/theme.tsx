import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { theme as hdsTheme } from '@highoutput/hds';
import { theme as saasTheme } from '@saas-ui/react';

import { badgeStyles } from './components/badge';
import { buttonStyles } from './components/button';
import { Card } from './components/card';
import { inputStyles } from './components/input';
import { linkStyles } from './components/link';
import { menuStyles } from './components/menu';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { switchStyles } from './components/switch';
import { textareaStyles } from './components/textarea';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';

export default extendTheme(
  hdsTheme,
  saasTheme,
  { breakpoints }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  menuStyles,
  {
    components: {
      Card,
    },
  }
);

export interface CustomCardProperties
  extends HTMLChakraProps<'div'>,
    ThemingProps {}
