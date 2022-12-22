import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  ColumnReferanceRO,
  StrictColumnReferanceRO,
} from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const columnReferanceAdapter = createEntityAdapter<StrictColumnReferanceRO>({
  selectId: (columnReferance) => columnReferance.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  columnReferanceAdapter;

const columnReferanceSlice = createSlice({
  name: 'columnReferance',
  initialState: columnReferanceAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ColumnReferanceRO) {
        return {
          payload: prepareStateUpdate<StrictColumnReferanceRO>(payload),
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: ColumnReferanceRO[]) {
        return {
          payload: payload.map((item) =>
            prepareStateUpdate<StrictColumnReferanceRO>(item)
          ),
        };
      },
    },
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<ColumnReferanceRO>(
      builder,
      isAnyOf(
        columnReferanceSlice.actions.upsertOne.match,
        columnReferanceSlice.actions.upsertMany
      ),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = columnReferanceSlice;
export const { getSelectors } = columnReferanceAdapter;
