import { Flex, Spacer } from '@chakra-ui/react';

import { TabeDocumentation } from './components/table-document';

export const TablesMetadata = () => {
  return (
    <Flex px={3} pb={0} flexDirection="column" flex={1} width="100%">
      <TabeDocumentation />
    </Flex>
  );
};
