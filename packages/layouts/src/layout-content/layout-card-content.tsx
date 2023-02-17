import {
  Card,
  CardBody,
  CardBodyProps,
  CardProps,
  Flex,
  FlexProps,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { LayoutContentProperties } from './layout-content';

export type LayoutCardContentProperties = LayoutContentProperties & {
  containerProperties?: FlexProps;
  cardProperties?: CardProps;
  cardBodyProperties?: CardBodyProps;
};

export const LayoutCardContent: FC<
  PropsWithChildren<LayoutCardContentProperties>
> = ({
  children,
  cardProperties = {},
  cardBodyProperties = {},
  containerProperties = {},
}) => (
  <Flex {...containerProperties} height="100%" pr={2}>
    <Card
      height="initial"
      variant="elevated"
      overflow="revert"
      borderRadius="lg"
      {...cardProperties}
    >
      <CardBody bg="inherit" borderRadius="lg" {...cardBodyProperties}>
        {children}
      </CardBody>
    </Card>
  </Flex>
);
