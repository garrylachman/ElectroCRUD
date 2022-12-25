import { ButtonProps, Icon, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

export const DeleteIconButton: FC<ButtonProps> = (properties) => (
  <IconButton
    variant="solid"
    colorScheme="red"
    size="sm"
    aria-label=""
    icon={<Icon as={HiOutlineTrash} boxSize={4} />}
    {...properties}
  />
);
