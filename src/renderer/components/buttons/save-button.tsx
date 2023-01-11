import { ButtonProps, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MdSave } from 'react-icons/md';

import { RippleButton } from './ripple-button';

export const SaveButton: FC<ButtonProps> = (properties) => (
  <RippleButton
    variant="solid"
    bgColorScheme="primary"
    size="lg"
    {...properties}
    gap={2}
  >
    <Icon as={MdSave} boxSize={5} />
    <Text>Save</Text>
  </RippleButton>
);