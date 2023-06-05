import { ButtonProps, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { MdEdit } from 'react-icons/md';

import { RippleButton } from './ripple-button';

export const EditIconButton: FC<ButtonProps> = (properties) => (
  <RippleButton size="sm" {...properties} p={2} borderRadius={60} rounded={60}>
    <Icon as={MdEdit} boxSize={4} />
  </RippleButton>
);
