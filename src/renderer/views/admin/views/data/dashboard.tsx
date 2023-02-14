import { TabProperties, Tabs } from '@electrocrud/tabs';
import { MdNotes, MdOutlineCollections } from 'react-icons/md';

import DatasetCoordinator from './dataset-coordinator';
import { Documentation } from './documentation';

const tabs: TabProperties[] = [
  {
    name: 'Dataset',
    element: <DatasetCoordinator />,
    icon: MdOutlineCollections,
  },
  {
    name: 'Documentation',
    element: <Documentation />,
    icon: MdNotes,
  },
];

export const Dashboard = () => {
  return (
    <Tabs
      tabsList={tabs}
      tabIndex={0}
      iconSize="15px"
      colorScheme="primary"
      fontSize="md"
      marginTop={5}
      fillAvailable
      isFitted={false}
      mt={0}
    />
  );
};
