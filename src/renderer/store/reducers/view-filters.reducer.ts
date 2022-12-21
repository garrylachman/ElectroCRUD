import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ViewFilterRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';

const viewFiltersAdapter = createEntityAdapter<ViewFilterRO>({
  selectId: (filter: ViewFilterRO) => filter?.id || '',
  sortComparer: (a, b) => (a?.creationDate || 0) - (b?.creationDate || 0),
});

const { upsertOne, removeOne, removeMany } = viewFiltersAdapter;

const viewFiltersSlice = createSlice({
  name: 'viewsFilter',
  initialState: viewFiltersAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ViewFilterRO, meta?: { new?: boolean }) {
        const cdObject = payload.id ? {} : { creationDate: Date.now() };
        return {
          payload: {
            ...payload,
            id: payload.id || uuidv4(),
            ...cdObject,
            modificationDate: Date.now(),
          },
          meta,
        };
      },
    },
    removeOne,
    removeMany,
  },
});

export const { actions, reducer, name } = viewFiltersSlice;

export const { getSelectors } = viewFiltersAdapter;
