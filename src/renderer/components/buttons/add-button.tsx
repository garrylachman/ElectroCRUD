import { ButtonProps, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MdAdd } from 'react-icons/md';

import { RippleButton } from './ripple-button';

export const AddButton: FC<ButtonProps> = (properties) => (
  <RippleButton variant="solid" bgColorScheme="primary" {...properties} gap={1}>
    <Icon as={MdAdd} boxSize={5} />
    <Text>Add New</Text>
  </RippleButton>
);
