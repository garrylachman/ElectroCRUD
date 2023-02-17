import { Flex, FlexProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export type LayoutWidgetsSectionProperties = {
  name: string;
  sectionProperties?: FlexProps;
};

export const LayoutWidgetsSection: FC<
  PropsWithChildren<LayoutWidgetsSectionProperties>
> = ({ children, sectionProperties = {} }) => {
  return (
    <Flex width="100%" {...sectionProperties}>
      {children}
    </Flex>
  );
};
