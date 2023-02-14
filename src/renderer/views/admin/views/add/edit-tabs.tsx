import { TabProperties, Tabs } from '@electrocrud/tabs';
import { MdFormatPaint, MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { WithErrorComponent } from 'renderer/containers/error';
import { ViewScopedContextProvider } from 'renderer/contexts';

import { AddOrEditView } from '.';
import { Desinger } from './designer';
import { MetadataTabs } from './metadata';

const tabs: TabProperties[] = [
  {
    name: 'Dataset',
    element: <AddOrEditView />,
    icon: MdOutlineCollections,
  },
  {
    name: 'Metadata',
    element: <MetadataTabs />,
    icon: MdOutlineCollections,
  },
  {
    name: 'Desinger',
    element: <Desinger />,
    icon: MdFormatPaint,
  },
];

export const EditTabs = () => {
  const { viewId } = useParams();

  return (
    <WithErrorComponent>
      <ViewScopedContextProvider viewId={viewId}>
        <Tabs
          tabsList={tabs}
          tabIndex={0}
          iconSize="15px"
          colorScheme="primary"
          fontSize="md"
          marginTop={5}
          fillAvailable
          isFitted={false}
          mt={0}
        />
      </ViewScopedContextProvider>
    </WithErrorComponent>
  );
};

export default EditTabs;
