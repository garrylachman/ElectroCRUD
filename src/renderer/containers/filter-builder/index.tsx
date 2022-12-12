import { Text, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'renderer/store/hooks';
import { FiltersReducer } from 'renderer/store/reducers';
import {
  createFiltersSelector,
} from 'renderer/store/selectors/filters.selectors';
import { RootState } from 'renderer/store/store';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { FilterBuilderWheresGroup } from './filter-builder-wheres-group';

type FilterBuilderProperties = {
  id?: string;
};

export const FilterBuilder: FC<FilterBuilderProperties> = ({ id }) => {
  const distpatch = useAppDispatch();
  const [filterId, setFilterId] = useState(id);

  useEffect(() => {
    if (filterId === undefined) {
      const result = distpatch(
        FiltersReducer.actions.upsertOne({ and: true }, { new: true })
      );
      if (result.payload.id) {
        setFilterId(result.payload.id);
      }
    }
  }, []);

  const createSelector = useSelector((state: RootState) =>
    createFiltersSelector(state)
  );

  const filtersState = createSelector(filterId);

  useEffect(() => {
    console.log(filtersState);
  }, [filtersState]);

  return (
    <VStack alignItems="flex-start" w="100%">
      <Text fontWeight="bold" fontSize="xl">
        Where Groups
      </Text>
      {filterId && <FilterBuilderWheresGroup filterId={filterId} />}
    </VStack>
  );
};
