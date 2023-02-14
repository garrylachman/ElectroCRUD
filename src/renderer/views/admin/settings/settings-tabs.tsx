import { FC } from 'react';
import { MdAccountTree, MdSettingsSuggest } from 'react-icons/md';
import { TabProperties, Tabs } from '@electrocrud/tabs';

import { SettingsDataTabs } from './data';
import { SettingsGeneral } from './general';

const tabs: TabProperties[] = [
  {
    name: 'General',
    element: <SettingsGeneral />,
    icon: MdSettingsSuggest,
  },
  {
    name: 'Data',
    element: <SettingsDataTabs />,
    icon: MdAccountTree,
  },
];

export const SettingsTabs: FC<any> = () => {
  return (
    <Tabs
      tabsList={tabs}
      tabIndex={0}
      iconSize={6}
      colorScheme="primary"
      isFitted={false}
      fillAvailable
      tabPanelProps={{
        marginBottom: 5,
      }}
      marginTop={5}
      mt={0}
    />
  );
};
