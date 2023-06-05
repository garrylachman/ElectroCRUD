import { Box, Flex, Stack } from '@chakra-ui/react';
import { Brand } from './brand';
import { Links } from './links';

export const Content = () => {
  return (
    <Flex direction="column" height="100%">
      <Stack direction="column" m={0} p={0}>
        <Box m={4}>
          <Brand />
        </Box>
        <Box m={0} sx={{ marginTop: '0px !important' }}>
          <Box height="-webkit-fill-available" overflow="hidden" mb={0}>
            <Links />
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};
