import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { SubCard } from 'renderer/containers/cards';
import ReactTimeAgo from 'react-time-ago';
import { ViewRO } from 'renderer/defenitions/record-object'
import { FC } from 'react';

type TabsHeaderProps = {
  viewState: ViewRO;
};

export const CreatedDateCard = ({ value }: { value: number }) => (
  <SubCard variant="brand">
    <Stat>
      <StatLabel>Created at</StatLabel>
      <StatNumber>
        <ReactTimeAgo date={value} />
      </StatNumber>
    </Stat>
  </SubCard>
);

export const ModificationDateCard = ({ value }: { value: number }) => (
  <SubCard variant="brand">
    <Stat>
      <StatLabel>Last updated at</StatLabel>
      <StatNumber>
        <ReactTimeAgo date={value} />
      </StatNumber>
    </Stat>
  </SubCard>
);

export const TabsHeader: FC<TabsHeaderProps> = ({ viewState }) => {
  return (
    <VStack>
      <SimpleGrid columns={4} spacing={10} w="100%">
        <CreatedDateCard value={viewState.creationDate} />
        <ModificationDateCard value={viewState.creationDate} />
      </SimpleGrid>
    </VStack>
  )
};
