import { Card, CardBody, CardHeader } from '@chakra-ui/react';
import { FC } from 'react';

export const SettingsGeneral: FC<any> = () => {
  return (
    <>
      <Card variant="elevated">
        <CardHeader>General Title</CardHeader>
        <CardBody>General Body</CardBody>
      </Card>
    </>
  );
};