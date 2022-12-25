import { ButtonProps, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { MdSave } from 'react-icons/md';

import { RippleButton } from './ripple-button';

export const SaveButton: FC<ButtonProps> = (properties) => (
  <RippleButton variant="brand" size="lg" {...properties}>
    <Icon mr={2} as={MdSave} boxSize={5} />
    Save
  </RippleButton>
);
