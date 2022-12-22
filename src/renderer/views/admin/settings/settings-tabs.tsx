import { FC } from 'react';
import { MdAccountTree, MdSettingsSuggest } from 'react-icons/md';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';

import { SettingsData } from './data';
import { SettingsGeneral } from './general';

const tabs: ElectroCRUDTabProperties[] = [
  {
    name: 'General',
    component: () => <SettingsGeneral />,
    icon: MdSettingsSuggest,
  },
  {
    name: 'Data',
    component: () =>  <SettingsData />,
    icon: MdAccountTree,
  },
];

export const SettingsTabs: FC<any> = () => {
  return (
    <>
      <ElectroCRUDTabs tabsList={tabs} tabIndex={0} iconSize={6} colorScheme="brand" />
    </>
  );
};
