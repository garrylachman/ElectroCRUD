import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  StrictViewDetailsRO,
  ViewDetailsRO,
} from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const viewDetailsAdapter = createEntityAdapter<StrictViewDetailsRO>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.creationDate - b.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany } = viewDetailsAdapter;

const viewDetailsSlice = createSlice({
  name: 'viewDetails',
  initialState: viewDetailsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: StrictViewDetailsRO) {
        return {
          payload: prepareStateUpdate<StrictViewDetailsRO>(payload),
        };
      },
    },
    removeOne,
    removeMany,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<StrictViewDetailsRO>(
      builder,
      isAnyOf(viewDetailsSlice.actions.upsertOne.match),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = viewDetailsSlice;
export const { getSelectors } = viewDetailsAdapter;
