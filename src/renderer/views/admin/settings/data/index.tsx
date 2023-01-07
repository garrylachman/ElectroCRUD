import { Card, CardBody, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MdSettingsSuggest } from 'react-icons/md';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';

import { Policies } from './tabs/policies';

const tabs: ElectroCRUDTabProperties[] = [
  {
    name: 'Policies',
    component: () => <Policies />,
    icon: MdSettingsSuggest,
  },
];

export const SettingsDataTabs: FC<any> = () => {
  return (
    <Card flex={1} display="flex" height="-webkit-fill-available" variant="elevated">
      <CardBody px={0} pb={0} overflow="scroll">
        <ElectroCRUDTabs
          tabsList={tabs}
          tabIndex={0}
          iconSize={6}
          colorScheme="primary"
        />
      </CardBody>
    </Card>
  );
};
