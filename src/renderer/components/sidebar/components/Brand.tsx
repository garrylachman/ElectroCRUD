// Chakra imports
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';

import { HSeparator } from 'renderer/components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text my="40px" fontWeight="extrabold" fontSize="3xl" color={logoColor}>
        ElectroCRUD v3
      </Text>
    </Flex>
  );
}

export default SidebarBrand;
