import {
  Box,
  Card,
  CardBody,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import { useContext } from 'react';
import { IconType } from 'react-icons/lib';
import { MdAccessTime, MdAccessTimeFilled } from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import { ViewScopedContext } from 'renderer/contexts';

export const DateCard = ({
  value,
  title,
  icon,
}: {
  value?: number;
  title: string;
  icon: IconType;
}) => (
  <Card variant="elevated">
    <CardBody>
      <HStack>
        <Stat>
          <StatLabel textTransform="uppercase">{title}</StatLabel>
          <StatNumber fontSize="lg" py={1}>
            {value ? <ReactTimeAgo date={value} /> : 'N/A'}
          </StatNumber>
          <StatHelpText as="kbd" fontSize="2xs">
            {moment(value).toLocaleString()}
          </StatHelpText>
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

export const TabsHeader = () => {
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
