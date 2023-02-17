import { Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MdSettingsSuggest } from 'react-icons/md';
import { TabProperties, Tabs } from '@electrocrud/tabs';

import { Policies } from './tabs/policies';

const tabs: TabProperties[] = [
  {
    name: 'Policies',
    element: <Policies />,
    icon: MdSettingsSuggest,
  },
];

export const SettingsDataTabs: FC<any> = () => {
  return (
    <Flex flex={1} flexDirection="column">
      <Tabs
        tabsList={tabs}
        tabIndex={0}
        iconSize={6}
        colorScheme="primary"
        mt={0}
        marginTop={3}
        isSticky
      />
    </Flex>
  );
};
