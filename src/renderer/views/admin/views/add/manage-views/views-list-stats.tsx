import {
  Box,
  Card,
  CardBody,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';
import { TbColumns, TbEdit, TbLayout2 } from 'react-icons/tb';
import ReactTimeAgo from 'react-time-ago';
import { StrictViewRO } from 'renderer/defenitions/record-object';

export const DateCard = ({
  value,
  title,
  icon,
  isDate = false,
}: {
  value?: number;
  title: string;
  icon: IconType;
  isDate?: boolean;
}) => (
  <Card variant="elevated">
    <CardBody>
      <HStack>
        <Stat>
          <StatLabel textTransform="uppercase">{title}</StatLabel>
          <StatNumber fontSize="xl" pt={2}>
            {!isDate && value}
            {isDate && value && <ReactTimeAgo date={value} />}
          </StatNumber>
        </Stat>
        <Box
          bg="primary.500"
          position="absolute"
          right={0}
          width="100px"
          height="100%"
          display="flex"
          justifyContent="center"
        >
          <Center>
            <Icon as={icon} fontSize="40px" m={2} color="white" />
          </Center>
        </Box>
      </HStack>
    </CardBody>
  </Card>
);

export type ViewsListStatsProperties = {
  viewsState: StrictViewRO[];
};

export const ViewsListStats: FC<ViewsListStatsProperties> = ({
  viewsState,
}) => {
  const columnsCount = viewsState.reduce(
    (accumulator, current) => accumulator + (current.columns?.length || 0),
    0
  );

  // eslint-disable-next-line unicorn/no-array-reduce
  const lastModification = viewsState.reduce(
    (accumulator, current) =>
      (current?.modificationDate || 0) > accumulator
        ? current?.modificationDate || 0
        : accumulator,
    0
  );

  return (
    <VStack pb={5} width="100%">
      <SimpleGrid columns={3} spacing={5} w="100%">
        <DateCard
          title="# of view"
          value={viewsState.length}
          icon={TbLayout2}
        />
        <DateCard
          title="# of columns in views"
          value={columnsCount}
          icon={TbColumns}
        />
        <DateCard
          title="Last modification"
          value={lastModification}
          icon={TbEdit}
          isDate
        />
      </SimpleGrid>
    </VStack>
  );
};
