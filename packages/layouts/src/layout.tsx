import { Flex } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export type LayoutProperties = {
  sections?: ReactElement[];
};

export const Layout: FC<LayoutProperties> = ({ sections = [] }) => {
  return (
    <Flex w="100%" borderRadius="lg" overflow="hidden" flexDirection="column">
      <>
        {sections.map((item) => (
          <>{item}</>
        ))}
      </>
    </Flex>
  );
};
