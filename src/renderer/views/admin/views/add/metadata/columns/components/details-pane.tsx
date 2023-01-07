import { Box, BoxProps, Center, Spinner } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { MdNotes, MdOutlineRepeat } from 'react-icons/md';
import { TbBinary, TbListDetails } from 'react-icons/tb';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { O } from 'ts-toolbelt';

import { ColumnDetails, ColumnDocumentation, ColumnReletions } from '../tabs';

const tabs: ElectroCRUDTabProperties[] = [
  {
    name: 'Details',
    component: () => <ColumnDetails />,
    icon: TbListDetails,
  },
  {
    name: 'Documentation',
    component: () => <ColumnDocumentation />,
    icon: MdNotes,
  },
  {
    name: 'Relations',
    component: () => <ColumnReletions />,
    icon: MdOutlineRepeat,
  },
];

export type DetailsPaneProperties = O.Merge<BoxProps, {}>;

export const DetailsPane: FC<DetailsPaneProperties> = ({ ...properties }) => {
  const { memState } = useContext(ScopeContext);

  return (
    <Box py={3} px={3} {...properties} overflowX="hidden">
      {memState.columnId && (
        <ElectroCRUDTabs
          tabsList={tabs}
          tabIndex={0}
          iconSize={6}
          colorScheme="primary"
          marginTop={5}
        />
      )}
      {!memState.columnId && (
        <Center>
          <Spinner size="xl" color="primary.200" />
        </Center>
      )}
    </Box>
  );
};
