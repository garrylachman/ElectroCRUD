import { FC } from 'react';
import { MdNoteAlt } from 'react-icons/md';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';

import { DesignerDetails } from './details';

const tabs: ElectroCRUDTabProperties[] = [
  {
    name: 'Details',
    component: () => <DesignerDetails />,
    icon: MdNoteAlt,
  },
];

export const DesignTabs: FC<any> = () => {
  return (
    <>
      <ElectroCRUDTabs
        tabsList={tabs}
        tabIndex={0}
        iconSize="15px"
        colorScheme="primary"
        fontSize="sm"
        hasScrollbar
        fillAvailable
      />
    </>
  );
};
