import {
  Card,
  CardBody,
  CardBodyProps,
  CardProps,
  Flex,
  FlexProps,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export type LayoutCardSectionProperties = {
  name: string;
  sectionProperties?: FlexProps;
  cardProperties?: CardProps;
  cardBodyProperties?: CardBodyProps;
};

export const LayoutCardSection: FC<
  PropsWithChildren<LayoutCardSectionProperties>
> = ({
  children,
  sectionProperties = {},
  cardProperties = {},
  cardBodyProperties = {},
}) => {
  return (
    <Flex width="100%" {...sectionProperties}>
      <Card {...cardProperties}>
        <CardBody {...cardBodyProperties}>{children}</CardBody>
      </Card>
    </Flex>
  );
};
