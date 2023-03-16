import { Center, Icon, Spinner, Text } from '@chakra-ui/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { v4 } from 'uuid';
import { FilterBuilder } from 'renderer/containers/filter-builder';

import { PromiseModal } from './promise-modal';
import { ActionButtonType } from '@electrocrud/buttons';
import { StrictViewVO } from 'renderer/defenitions/record-object';
import { Suspense } from 'react';
import { InlineSpinner } from '../icons';

export const ConfirmPromiseFiltersModal = (viewState: StrictViewVO) => {
  let filterHolder: Record<string, string>;

  const setFilterHandler = (name: string, value: string, close = false) => {
    filterHolder = { name, value };
  };

  return PromiseModal({
    keyu: v4(),
    instanceId: v4(),
    size: '5xl',
    getValue: () => filterHolder,
    actionButtons: [
      ActionButtonType.APPLY_FILTER,
      ActionButtonType.SAVE_AND_APPLY_FILTER,
      ActionButtonType.CANCEL,
    ],
    title: (
      <Text display="inline-flex" fontWeight="medium" textTransform="uppercase">
        Filters Modal
      </Text>
    ),
    children: (properties) => (
      <Suspense fallback={<InlineSpinner />}>
        <FilterBuilder viewState={viewState} setFilter={setFilterHandler} />
      </Suspense>
    ),
  });
};
