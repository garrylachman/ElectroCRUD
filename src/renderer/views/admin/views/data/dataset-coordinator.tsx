import { Flex } from '@chakra-ui/react';
import { memo, useMemo, useRef } from 'react';
import { TbTable } from 'react-icons/tb';
import { TabProperties, Tabs, TabsAPI } from '@electrocrud/tabs';

import { DataTableCard } from './data-table';

export default memo(function DatasetCoordinator() {
  const tabsReference = useRef<TabsAPI>();

  const tabs: TabProperties[] = useMemo(
    () => [
      {
        name: 'Data Table',
        element: <DataTableCard tabsReference={tabsReference} />,
        icon: TbTable,
      },
    ],
    []
  );

  return (
    <Flex py={0} height="100%">
      <Tabs
        tabsList={tabs}
        tabIndex={0}
        iconSize="15px"
        colorScheme="primary"
        fontSize="sm"
        hasScrollbar={false}
        // @ts-ignore
        ref={tabsReference}
        tabPanelProps={{
          marginBottom: 0,
        }}
        mt={0}
      />
    </Flex>
  );
});
