// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Text my={10} fontWeight="extrabold" fontSize="3xl" color={logoColor}>
      ElectroCRUD v3
    </Text>
  );
}

export default SidebarBrand;
