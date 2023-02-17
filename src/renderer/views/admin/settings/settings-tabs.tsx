import { FC } from 'react';
import { MdAccountTree, MdSettingsSuggest } from 'react-icons/md';
import { SettingsDataTabs } from './data';
import { SettingsGeneral } from './general';
import {
  LayoutCardContent,
  TabLayout,
  TabLayoutContentProperties,
} from '@electrocrud/layouts';
import { CardBodyProps } from '@chakra-ui/card';

const cardBodyStyle: CardBodyProps = {
  p: 0,
  px: 3,
  py: 3,
  borderRadius: 'lg',
};

const content: TabLayoutContentProperties[] = [
  {
    label: 'General',
    element: (
      <LayoutCardContent name="metadata" cardBodyProperties={cardBodyStyle}>
        <SettingsGeneral />
      </LayoutCardContent>
    ),
    icon: MdSettingsSuggest,
  },
  {
    label: 'Data',
    element: (
      <LayoutCardContent name="metadata" cardBodyProperties={cardBodyStyle}>
        <SettingsDataTabs />
      </LayoutCardContent>
    ),
    icon: MdAccountTree,
  },
];

export const SettingsTabs: FC<any> = () => {
  return <TabLayout content={content} isFitted={false} />;
};
