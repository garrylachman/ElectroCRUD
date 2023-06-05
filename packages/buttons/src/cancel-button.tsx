import { ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

import { RippleButton } from './ripple-button';

export const CancelButton: FC<ButtonProps> = (properties) => (
  <RippleButton bgColorScheme="red" {...properties}>
    Cancel
  </RippleButton>
);
