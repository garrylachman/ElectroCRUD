import { Box, Spacer } from '@chakra-ui/react';

import { TabeDocumentation } from './components/table-document';

export const TablesMetadata = () => {
  return (
    <Box px={5} pb={6}>
      <TabeDocumentation />
      <Spacer p={3} />
    </Box>
  );
};
