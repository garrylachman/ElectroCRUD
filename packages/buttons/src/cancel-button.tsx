import { ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

import { RippleButton } from './ripple-button';

export const CancelButton: FC<ButtonProps> = (properties) => (
  <RippleButton variant="solid" bgColorScheme="red" size="lg" {...properties}>
    Cancel
  </RippleButton>
);
