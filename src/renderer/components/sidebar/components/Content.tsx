import { Box, Flex, Stack } from '@chakra-ui/react';
import Brand from 'renderer/components/sidebar/components/Brand';
import Links from 'renderer/components/sidebar/components/Links';

// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
  const { routes } = props;

  return (
    <Flex direction="column" height="100%" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ md: '16px', '2xl': '0px' }}
        mt="60px"
        borderRadius="30px"
      />
    </Flex>
  );
}

export default SidebarContent;
