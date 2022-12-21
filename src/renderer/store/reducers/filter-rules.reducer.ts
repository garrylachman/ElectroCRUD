import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FilterRuleRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';

const filterRulesAdapter = createEntityAdapter<FilterRuleRO>({
  selectId: (filterRule: FilterRuleRO) => filterRule?.id || '',
  sortComparer: (a, b) => (a?.creationDate || 0) - (b?.creationDate || 0),
});

const { upsertOne, upsertMany, removeOne, removeMany } = filterRulesAdapter;

export const filterRulesSlice = (name: string) =>
  createSlice({
    name,
    initialState: filterRulesAdapter.getInitialState(),
    reducers: {
      upsertOne: {
        reducer: upsertOne,
        prepare(payload: FilterRuleRO) {
          const cdObject = payload.id ? {} : { creationDate: Date.now() };
          return {
            payload: {
              ...payload,
              id: payload.id || uuidv4(),
              ...cdObject,
              modificationDate: Date.now(),
            },
          };
        },
      },
      removeOne,
      removeMany,
    },
  });

export const { getSelectors } = filterRulesAdapter;
