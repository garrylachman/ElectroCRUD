import { Card, CardBody, Spacer } from '@chakra-ui/react';

import { DesignTabs } from './tabs';

export const Desinger = () => (
  <Card px={0} overflow="unset">
      <CardBody px={0}>
        <DesignTabs />
    </CardBody>
  </Card>
);
