import { Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export type LayoutContentProperties = {
  name: string;
};

export const LayoutContent: FC<PropsWithChildren<LayoutContentProperties>> = ({
  children,
}) => {
  return (
    <Flex height="-webkit-fill-available" pr={2}>
      {children}
    </Flex>
  );
};
