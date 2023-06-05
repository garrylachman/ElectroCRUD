import { ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

import { RippleButton } from './ripple-button';

export const DeleteButton: FC<ButtonProps> = (properties) => (
  <RippleButton bgColorScheme="red" {...properties}>
    Delete
  </RippleButton>
);
