import { MdFormatPaint, MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { ViewScopedContextProvider } from 'renderer/contexts';

import { AddOrEditView } from '.';
import { Desinger } from './designer';
import { MetadataTabs } from './metadata';

const tabs: ElectroCRUDTabProperties[] = [
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
    <ViewScopedContextProvider viewId={viewId}>
      <ElectroCRUDTabs
        tabsList={tabs}
        tabIndex={0}
        iconSize="15px"
        colorScheme="primary"
        fontSize="md"
        marginTop={5}
        fillAvailable
        isFitted={false}
      />
    </ViewScopedContextProvider>
  );
};
