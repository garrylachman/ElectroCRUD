import {
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  SimpleGrid,
  HStack,
  Icon,
  Box,
  Center,
  Card,
  CardBody, StatHelpText
} from '@chakra-ui/react';
import ReactTimeAgo from 'react-time-ago';
import { FC, useContext } from 'react';
import { MdAccessTime, MdAccessTimeFilled } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { ViewScopedContext } from 'renderer/contexts';
import moment from 'moment';

type TabsHeaderProperties = {
};

export const DateCard = ({
  value,
  title,
  icon,
}: {
  value?: number;
  title: string;
  icon: IconType;
}) => (
  <Card variant="brandBold">
    <CardBody>
    <HStack>
      <Stat>
        <StatLabel textTransform="uppercase">{title}</StatLabel>
        <StatNumber fontSize="lg" py={1}>{value ? <ReactTimeAgo date={value} /> : 'N/A'}</StatNumber>
        <StatHelpText as={"kbd"} fontSize="2xs">{moment(value).toLocaleString()}</StatHelpText>
      </Stat>
      <Box
        bg="blackAlpha.400"
        position="absolute"
        right={0}
        width="65px"
        height="100%"
        display="flex"
        justifyContent="center"
      >
        <Center>
          <Icon as={icon} fontSize="40px" m={2} />
        </Center>
      </Box>
    </HStack>
    </CardBody>
  </Card>
);

export const TabsHeader: FC<TabsHeaderProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);

  return (
    <VStack>
      <SimpleGrid columns={3} spacing={10} w="100%">
        <DateCard
          title="Created at"
          value={viewState?.creationDate}
          icon={MdAccessTimeFilled}
        />
        <DateCard
          title="Last updated at"
          value={viewState?.modificationDate}
          icon={MdAccessTime}
        />
      </SimpleGrid>
    </VStack>
  );
};
