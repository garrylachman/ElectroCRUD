import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export type SectionHeaderProperties = {
  title: string;
  subTitle?: string;
  RightComponent?: ReactElement;
};

export const SectionHeader: FC<SectionHeaderProperties> = ({
  title,
  subTitle,
  RightComponent,
}) => {
  return (
    <>
      <Flex spacing="4" flexDirection="row" justifyContent="space-between">
        <Box>
          <Heading mb={1} fontSize="xl">{title}</Heading>
          <Text alignItems="center" display="flex" as="kbd" fontSize="sm">
            {subTitle && <Box>{subTitle}</Box>}
          </Text>
        </Box>
        <Box>{RightComponent && <RightComponent />}</Box>
      </Flex>
      <Divider my={5} />
    </>
  );
};
