import { Box, SimpleGrid } from '@chakra-ui/react';
import { AccountsTable } from './components/accounts-table';

export default function Accounts() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px' }}
        h="100vh"
        pb="120px"
      >
        <AccountsTable />
      </SimpleGrid>
    </Box>
  );
}
