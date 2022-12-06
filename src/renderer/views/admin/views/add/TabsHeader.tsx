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
} from '@chakra-ui/react';
import { SubCard } from 'renderer/containers/cards';
import ReactTimeAgo from 'react-time-ago';
import { ViewRO } from 'renderer/defenitions/record-object';
import { FC, useContext, useMemo } from 'react';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';
import { useSelector } from 'react-redux';
import { ViewSelectors } from 'renderer/store/selectors';
import { MdAccessTime, MdAccessTimeFilled } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { ViewScopedContext } from 'renderer/contexts';

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
  <SubCard variant="brand">
    <HStack>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{value ? <ReactTimeAgo date={value} /> : 'N/A'}</StatNumber>
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
  </SubCard>
);

export const TabsHeader: FC<TabsHeaderProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);

  return (
    <VStack>
      <SimpleGrid columns={4} spacing={10} w="100%">
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
