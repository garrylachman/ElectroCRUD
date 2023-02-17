import { Flex, FlexProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export type LayoutSectionProperties = {
  name: string;
  sectionProperties?: FlexProps;
};

export const LayoutSection: FC<PropsWithChildren<LayoutSectionProperties>> = ({
  children,
  sectionProperties = {},
}) => {
  return (
    <Flex flex={1} {...sectionProperties}>
      {children}
    </Flex>
  );
};
