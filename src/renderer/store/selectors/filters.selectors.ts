import { Dictionary, EntityState } from '@reduxjs/toolkit';
import { arrayToTree } from 'performant-array-to-tree';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { FilterRO } from 'renderer/defenitions/record-object/filters.define';

import { FiltersReducer } from '../reducers';
import { RootState } from '../store';

export const createFiltersSelector = R.curry(
  (rootState: RootState, filterId: string) =>
    memoize((state: RootState) => {
      const filtersList = FiltersReducer.getSelectors().selectAll(
        state.filters
      );
      const filtersTree = arrayToTree(filtersList);
      const fPath = R.pathEq(['data', 'id'], filterId);

      return R.find(fPath, filtersTree);
    })(rootState)
);
