import { Box, useColorModeValue } from '@chakra-ui/react';
import { Content } from 'renderer/components/sidebar/components/content';

export function Sidebar() {
  const shadow = useColorModeValue(
    '10px 7px 30px 5px rgb(112 144 176 / 30%)',
    'unset'
  );

  return (
    <Box
      as="nav"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      bg="blackAlpha.900"
      boxShadow={shadow}
      minH="100%"
    >
      <Content />
    </Box>
  );
}
