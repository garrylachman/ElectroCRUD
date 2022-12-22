import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  PolicyRuleRO,
  StrictPolicyRuleRO,
} from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const policiesAdapter = createEntityAdapter<StrictPolicyRuleRO>({
  selectId: (policy) => policy.id,
  sortComparer: (a, b) => a.creationDate - b.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany } = policiesAdapter;

const policiesSlice = createSlice({
  name: 'policies',
  initialState: policiesAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: PolicyRuleRO) {
        return {
          payload: prepareStateUpdate<StrictPolicyRuleRO>(payload),
        };
      },
    },
    removeOne,
    removeMany,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<PolicyRuleRO>(
      builder,
      isAnyOf(policiesSlice.actions.upsertOne.match),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = policiesSlice;
export const { getSelectors } = policiesAdapter;
