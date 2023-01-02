import { Box, Flex, Stack } from '@chakra-ui/react';
import Brand from 'renderer/components/sidebar/components/Brand';
import Links from 'renderer/components/sidebar/components/Links';

// FUNCTIONS

function SidebarContent() {
  return (
    <Flex direction="column" height="100%">
      <Stack direction="column" mb="auto" mt={1}>
        <Box pl={5}>
          <Brand />
          <Links />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
