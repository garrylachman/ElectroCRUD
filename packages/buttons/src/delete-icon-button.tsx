import { ButtonProps, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import { RippleButton } from './ripple-button';

export const DeleteIconButton: FC<ButtonProps> = (properties) => (
  <RippleButton
    size="sm"
    {...properties}
    bgColor={{ step1: 'red.400', step2: 'red.600', step3: 'red.800' }}
    p={2}
  >
    <Icon as={HiOutlineTrash} boxSize={4} />
  </RippleButton>
);
