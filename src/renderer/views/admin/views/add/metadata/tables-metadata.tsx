import { Flex, Spacer } from '@chakra-ui/react';

import { TabeDocumentation } from './components/table-document';

export const TablesMetadata = () => {
  return (
    <Flex px={3} pb={0} height="100%" width="100%">
      <TabeDocumentation />
    </Flex>
  );
};
