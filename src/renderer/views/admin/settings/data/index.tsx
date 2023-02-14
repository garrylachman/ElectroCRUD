import { Card, CardBody, Text } from '@chakra-ui/react';
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
    <Card
      flex={1}
      display="flex"
      height="-webkit-fill-available"
      variant="elevated"
    >
      <CardBody px={0} pb={0}>
        <Tabs
          tabsList={tabs}
          tabIndex={0}
          iconSize={6}
          colorScheme="primary"
          mt={0}
          tabPanelProps={{
            marginTop: 5,
          }}
        />
      </CardBody>
    </Card>
  );
};
