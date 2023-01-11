import { Box, Card, CardBody } from '@chakra-ui/react';

import { DesignTabs } from './tabs';

export const Desinger = () => (
  <Box height="-webkit-fill-available">
    <Card overflow="unset" variant="elevated" height="100%">
      <CardBody px={0} py={0}>
        <DesignTabs />
      </CardBody>
    </Card>
  </Box>
);
