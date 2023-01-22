import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { MdNotes, MdOutlineCollections } from 'react-icons/md';

import DatasetCoordinator from './dataset-coordinator';
import { Documentation } from './documentation';

const tabs: ElectroCRUDTabProperties[] = [
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
    <ElectroCRUDTabs
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
