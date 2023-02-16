import { Box } from '@chakra-ui/react';
import { MdBook, MdTag } from 'react-icons/md';
import { TabProperties, Tabs } from '@electrocrud/tabs';

import { MetaColumnsWithContext } from './columns';
import { TablesMetadata } from './tables-metadata';

const tabs: TabProperties[] = [
  {
    name: 'Table Documentation',
    element: <TablesMetadata />,
    icon: MdBook,
  },
  {
    name: 'Columns',
    element: <MetaColumnsWithContext />,
    icon: MdTag,
  },
];

export const MetadataTabs = () => {
  return (
    <Box h="100%">
      <Tabs
        tabsList={tabs}
        tabIndex={0}
        iconSize="15px"
        colorScheme="primary"
        fontSize="sm"
        fillAvailable={false}
        marginTop={3}
        mt={0}
        isSticky
        hasScrollbar={false}
      />
    </Box>
  );
};

export * from './tables-metadata';
