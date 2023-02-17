import { CardBodyProps } from '@chakra-ui/card';
import { MdFormatPaint, MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  TabLayout,
  TabLayoutContentProperties,
  LayoutContent,
  LayoutCardContent,
} from '@electrocrud/layouts';
import { WithErrorComponent } from 'renderer/containers/error';
import { ViewScopedContextProvider } from 'renderer/contexts';

import { AddOrEditView } from '.';
import { Desinger } from './designer';
import { MetadataTabs } from './metadata';

const cardBodyStyle: CardBodyProps = {
  p: 0,
  px: 0,
  py: 3,
};

const content: TabLayoutContentProperties[] = [
  {
    label: 'Dataset',
    element: (
      <LayoutContent name="dataset">
        <AddOrEditView />
      </LayoutContent>
    ),
    icon: MdOutlineCollections,
  },
  {
    label: 'Metadata',
    element: (
      <LayoutCardContent name="metadata" cardBodyProperties={cardBodyStyle}>
        <MetadataTabs />
      </LayoutCardContent>
    ),
    icon: MdOutlineCollections,
  },
  {
    label: 'Desinger',
    element: (
      <LayoutCardContent name="desinger" cardBodyProperties={cardBodyStyle}>
        <Desinger />
      </LayoutCardContent>
    ),
    icon: MdFormatPaint,
  },
];

export const EditTabs = () => {
  const { viewId } = useParams();

  return (
    <WithErrorComponent>
      <ViewScopedContextProvider viewId={viewId}>
        <TabLayout content={content} isFitted={false} />
      </ViewScopedContextProvider>
    </WithErrorComponent>
  );
};

export default EditTabs;
