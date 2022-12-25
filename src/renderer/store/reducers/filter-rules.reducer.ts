import { AnyAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  FilterRuleRO,
  StrictFilterRuleRO,
} from 'renderer/defenitions/record-object';
import { Merge } from 'type-fest';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const filterRulesAdapter = createEntityAdapter<StrictFilterRuleRO>({
  selectId: (filterRule) => filterRule.id,
  sortComparer: (a, b) => a.creationDate - b.creationDate,
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
          return {
            payload: prepareStateUpdate<StrictFilterRuleRO>(payload),
          };
        },
      },
      removeOne,
      removeMany,
    },
    extraReducers: (builder) => {
      createLastModificationMatcher<FilterRuleRO>(
        builder,
        (action: Merge<AnyAction, { type: string }>) =>
          action.type.endsWith('temporaryFilterRules/upsertOne'),
        (action) => action.payload.id as string
      );
    },
  });

export const { getSelectors } = filterRulesAdapter;
