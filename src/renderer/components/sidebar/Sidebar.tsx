import { Box } from '@chakra-ui/react';
import { Content } from './components';

export const Sidebar = () => (
  <Box
    as="nav"
    zIndex="sticky"
    overflowX="hidden"
    overflowY="auto"
    bg="blackAlpha.900"
    boxShadow="2xl"
    minH="100%"
  >
    <Content />
  </Box>
);
