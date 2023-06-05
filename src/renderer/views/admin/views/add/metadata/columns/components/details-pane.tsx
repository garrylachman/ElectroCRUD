import { Box, BoxProps, Center, Spinner } from '@chakra-ui/react';
import { FC, useContext, useMemo } from 'react';
import { MdNotes, MdOutlineRepeat } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { TabProperties, Tabs } from '@electrocrud/tabs';
import { ScopeContext } from 'renderer/contexts/scope-context';

import { ColumnDetails, ColumnDocumentation, ColumnReletions } from '../tabs';

export type DetailsPaneProperties = BoxProps;

export const DetailsPane: FC<DetailsPaneProperties> = ({ ...properties }) => {
  const { memState } = useContext(ScopeContext);

  const tabs: TabProperties[] = useMemo(
    () => [
      {
        name: 'Details',
        element: (
          <ColumnDetails key={`ColumnDetails-${memState?.columnId || ''}`} />
        ),
        icon: TbListDetails,
      },
      {
        name: 'Documentation',
        element: (
          <ColumnDocumentation
            key={`ColumnDocumentation-${memState?.columnId || ''}`}
          />
        ),
        icon: MdNotes,
      },
      {
        name: 'Relations',
        element: (
          <ColumnReletions
            key={`ColumnReletions-${memState?.columnId || ''}`}
          />
        ),
        icon: MdOutlineRepeat,
      },
    ],
    [memState?.columnId]
  );

  return (
    <Box {...properties} py={0} pl={3} mt={0} overflowX="hidden" h="100%">
      {memState.columnId && (
        <Tabs
          tabsList={tabs}
          tabIndex={0}
          iconSize={6}
          colorScheme="primary"
          mt={0}
          tabPanelProps={{
            marginTop: 3,
          }}
          height="inherit"
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
