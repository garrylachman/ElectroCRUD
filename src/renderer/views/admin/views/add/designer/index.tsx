import { Flex } from '@chakra-ui/react';
import { DesignerDetails } from './tabs/details';

export const Desinger = () => (
  <Flex px={3} pb={0} flexDirection="column" flex={1} width="100%">
    <DesignerDetails />
  </Flex>
);
