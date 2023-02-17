import {
  LayoutCardContent,
  TabLayout,
  TabLayoutContentProperties,
} from '@electrocrud/layouts';
import { CardBodyProps } from '@saas-ui/react';
import { FC } from 'react';
import { MdNotes, MdOutlineCollections } from 'react-icons/md';
import { WithErrorComponent } from 'renderer/containers/error';
import DatasetCoordinator from './dataset-coordinator';
import { Documentation } from './documentation';

const cardBodyStyle: CardBodyProps = {
  p: 0,
  px: 3,
  py: 3,
  borderRadius: 'lg',
};

const content: TabLayoutContentProperties[] = [
  {
    label: 'Dataset',
    element: (
      <LayoutCardContent name="metadata" cardBodyProperties={cardBodyStyle}>
        <DatasetCoordinator />
      </LayoutCardContent>
    ),
    icon: MdOutlineCollections,
  },
  {
    label: 'Documentation',
    element: (
      <LayoutCardContent
        name="metadata"
        containerProperties={{ overflow: 'scroll' }}
        cardBodyProperties={cardBodyStyle}
      >
        <Documentation />
      </LayoutCardContent>
    ),
    icon: MdNotes,
  },
];

export const Dashboard: FC = () => (
  <WithErrorComponent>
    <TabLayout content={content} isFitted={false} hasScrollbar={false} />
  </WithErrorComponent>
);
