import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

export type SectionHeaderProperties = {
  title: string;
  subTitle?: string;
  RightComponent?: FC;
};

export const SectionHeader: FC<SectionHeaderProperties> = ({
  title,
  subTitle,
  RightComponent,
}) => {
  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Heading mb={1} fontSize="xl">
            {title}
          </Heading>
          <Text alignItems="center" display="flex" as="kbd" fontSize="sm">
            {subTitle && <Box>{subTitle}</Box>}
          </Text>
        </Box>
        <Box>{RightComponent && <RightComponent />}</Box>
      </Flex>
      <Divider mt={5} mb={5} borderColor="black" />
    </>
  );
};
