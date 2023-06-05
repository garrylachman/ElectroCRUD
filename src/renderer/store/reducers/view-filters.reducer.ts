import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  StrictViewFilterRO,
  ViewFilterRO,
} from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const viewFiltersAdapter = createEntityAdapter<StrictViewFilterRO>({
  selectId: (filter) => filter.id,
  sortComparer: (a, b) => a.creationDate - b.creationDate,
});

const { upsertOne, removeOne, removeMany } = viewFiltersAdapter;

const viewFiltersSlice = createSlice({
  name: 'viewsFilter',
  initialState: viewFiltersAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ViewFilterRO, meta?: { new?: boolean }) {
        return {
          payload: prepareStateUpdate<StrictViewFilterRO>(payload),
          meta,
        };
      },
    },
    removeOne,
    removeMany,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<ViewFilterRO>(
      builder,
      isAnyOf(viewFiltersSlice.actions.upsertOne.match),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = viewFiltersSlice;

export const { getSelectors } = viewFiltersAdapter;
