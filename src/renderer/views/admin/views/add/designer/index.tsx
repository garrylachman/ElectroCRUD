import { Box, Card, CardBody } from '@chakra-ui/react';

import { DesignTabs } from './tabs';

export const Desinger = () => (
  <Box height="-webkit-fill-available">
    <Card overflow="unset" variant="elevated" height="-webkit-fill-available">
      <CardBody px={0} py={0}>
        <DesignTabs />
      </CardBody>
    </Card>
  </Box>
);
