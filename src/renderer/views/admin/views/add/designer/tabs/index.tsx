import { FC } from 'react';
import { MdNoteAlt } from 'react-icons/md';
import { TabProperties, Tabs } from '@electrocrud/tabs';

import { DesignerDetails } from './details';

const tabs: TabProperties[] = [
  {
    name: 'Details',
    element: <DesignerDetails />,
    icon: MdNoteAlt,
  },
];

export const DesignTabs: FC<any> = () => {
  return (
    <>
      <Tabs
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
