import {
  Card,
  CardBody,
  CardBodyProps,
  CardProps,
  Flex,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { LayoutContentProperties } from './layout-content';

export type LayoutCardContentProperties = LayoutContentProperties & {
  cardProperties?: CardProps;
  cardBodyProperties?: CardBodyProps;
};

export const LayoutCardContent: FC<
  PropsWithChildren<LayoutCardContentProperties>
> = ({ children, cardProperties = {}, cardBodyProperties = {} }) => (
  <Flex height="100%" pr={2}>
    <Card
      height="initial"
      variant="elevated"
      overflow="revert"
      {...cardProperties}
    >
      <CardBody bg="inherit" {...cardBodyProperties}>
        {children}
      </CardBody>
    </Card>
  </Flex>
);
