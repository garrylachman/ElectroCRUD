import { Center, Icon, Spinner, Text } from '@chakra-ui/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { v4 } from 'uuid';
import { FilterBuilder } from 'renderer/containers/filter-builder';

import { PromiseModal } from './promise-modal';
import { ActionButtonType } from '@electrocrud/buttons';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { Suspense } from 'react';
import { InlineSpinner } from '../icons';
import { RecordFormBuilder } from 'renderer/containers/record-editor';

export const PromiseNewRecordModal = (
  columnViews: ColumnWithMetadataAndTags[]
) => {
  return PromiseModal({
    keyu: v4(),
    instanceId: v4(),
    size: '5xl',
    getValue: () => {},
    actionButtons: [ActionButtonType.SAVE, ActionButtonType.CANCEL],
    title: (
      <Text display="inline-flex" fontWeight="medium" textTransform="uppercase">
        Add New Record Modal
      </Text>
    ),
    children: (properties) => (
      <Suspense fallback={<InlineSpinner />}>
        <RecordFormBuilder
          columns={columnViews}
          formRef={properties.formCtxRef}
        />
      </Suspense>
    ),
  });
};
