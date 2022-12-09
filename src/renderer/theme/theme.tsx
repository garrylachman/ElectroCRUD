import { extendTheme, HTMLChakraProps, ThemingProps, CardProps } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps/chakra-ui-steps';
import { CardComponent } from './additions/card/card';
import { Card } from './components/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';

export default extendTheme(
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
  //CardComponent, // card component
  {
    components: {
      Steps,
      Card,
    },
  }
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
