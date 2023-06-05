import { FC, useCallback, useEffect, useState } from 'react';
import { Box, VStack, Input } from '@chakra-ui/react';
import memoize from 'proxy-memoize';
import { useSelector } from 'react-redux';
import { ViewScopedContextProvider } from 'renderer/contexts';
import { StrictViewVO } from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { TemporaryFiltersReducer } from 'renderer/store/reducers';
import {
  createFiltersSelector,
  FiltersTree,
} from 'renderer/store/selectors/filters.selectors';
import { RootState } from 'renderer/store/store';

import { FilterBuilderWheresGroup } from './filter-builder-wheres-group';
import { InlineSpinner } from 'renderer/components/icons';
import { uniqueId } from 'underscore';

type FilterBuilderProperties = {
  id?: string;
  setFilter?: (name: string, value: string, close?: boolean) => void;
  viewState: StrictViewVO;
};

export const FilterBuilder: FC<FilterBuilderProperties> = ({
  id,
  setFilter,
  viewState,
}) => {
  const distpatch = useAppDispatch();
  const [filterId, setFilterId] = useState(id);
  const [filterName, setFilterName] = useState<string>(uniqueId('Filter #'));

  const filtersState = useSelector<RootState, FiltersTree>(
    useCallback(
      memoize((state) => createFiltersSelector(state)(filterId)),
      [filterId]
    )
  );

  useEffect(() => {
    if (filtersState && setFilter) {
      setFilter(filterName, JSON.stringify(filtersState));
    }
  }, [filtersState, filterName]);

  useEffect(() => {
    setTimeout(() => {
      if (filterId === undefined) {
        const result = distpatch(
          TemporaryFiltersReducer.actions.upsertOne(
            { and: true, viewId: viewState?.id },
            { new: true }
          )
        );
        setFilterId(result.payload.id);
      }
    }, 1000);
  }, []);

  if (filterId == undefined) {
    return <InlineSpinner text="Initializing" />;
  }

  return (
    <ViewScopedContextProvider viewId={viewState.id}>
      <VStack alignItems="flex-start" w="100%">
        <Input
          variant="flushed"
          placeholder="Filter name"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
        />
        <Box height="280px" overflow="scroll" w="100%">
          {filterId && <FilterBuilderWheresGroup filterId={filterId} />}
        </Box>
      </VStack>
    </ViewScopedContextProvider>
  );
};
