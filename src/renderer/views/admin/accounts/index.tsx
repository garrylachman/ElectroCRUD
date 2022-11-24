import { Box, SimpleGrid } from '@chakra-ui/react';
import { AccountsTable } from './components/AccountsTable';

export default function Accounts() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={{ base: '20px' }}>
        <AccountsTable />
      </SimpleGrid>
    </Box>
  );
}
