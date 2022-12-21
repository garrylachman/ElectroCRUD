import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FilterRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';

const filtersAdapter = createEntityAdapter<FilterRO>({
  selectId: (filter: FilterRO) => filter?.id || '',
  sortComparer: (a, b) => (a?.creationDate || 0) - (b?.creationDate || 0),
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

export const { getSelectors } = filtersAdapter;
