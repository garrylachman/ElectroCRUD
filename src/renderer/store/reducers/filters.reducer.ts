/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AnyAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FilterRO, StrictFilterRO } from 'renderer/defenitions/record-object';
import { O } from 'ts-toolbelt';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const filtersAdapter = createEntityAdapter<StrictFilterRO>({
  selectId: (filter) => filter.id,
  sortComparer: (a, b) => a.creationDate - b.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany } = filtersAdapter;

export const filtersSlice = (name: string) =>
  createSlice({
    name,
    initialState: filtersAdapter.getInitialState(),
    reducers: {
      upsertOne: {
        reducer: upsertOne,
        prepare(payload: FilterRO, meta?: { new?: boolean }) {
          return {
            payload: prepareStateUpdate<StrictFilterRO>(payload),
            meta,
          };
        },
      },
      removeOne,
      removeMany,
    },
    extraReducers: (builder) => {
      createLastModificationMatcher<FilterRO>(
        builder,
        (action: O.Merge<AnyAction, { type: string }>) =>
          action.type.endsWith('temporaryFilters/upsertOne'),
        (action) => action.payload.id as string
      );
    },
  });

export const { getSelectors } = filtersAdapter;
