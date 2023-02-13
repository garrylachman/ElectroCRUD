import { ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

import { RippleButton } from './ripple-button';

export const AddButton: FC<ButtonProps> = (properties) => (
  <RippleButton
    variant="solid"
    bgColorScheme="primary"
    size="lg"
    {...properties}
  >
    Add New
  </RippleButton>
);
