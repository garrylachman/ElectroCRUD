import { Box, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { MdClose } from 'react-icons/md';

export type TabCloseProperties = {
  onClose: () => void;
};

export const TabClose: FC<TabCloseProperties> = ({ onClose }) => (
  <Box
    data-testid="tab-close"
    display="flex"
    onClick={(event) => {
      event.stopPropagation();
      onClose();
    }}
    color="red.500"
  >
    <Icon as={MdClose} boxSize={4} />
  </Box>
);
