import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  CodeExampleRO,
  StrictCodeExampleRO,
} from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const codeExamplesAdapter = createEntityAdapter<StrictCodeExampleRO>({
  selectId: (codeExample) => codeExample.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  codeExamplesAdapter;

const codeExamplesSlice = createSlice({
  name: 'codeExamples',
  initialState: codeExamplesAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: CodeExampleRO) {
        return {
          payload: prepareStateUpdate<StrictCodeExampleRO>(payload),
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: CodeExampleRO[]) {
        return {
          payload: payload.map((item) =>
            prepareStateUpdate<StrictCodeExampleRO>(item)
          ),
        };
      },
    },
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<CodeExampleRO>(
      builder,
      isAnyOf(
        codeExamplesSlice.actions.upsertOne.match,
        codeExamplesSlice.actions.upsertMany.match
      ),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = codeExamplesSlice;
export const { getSelectors } = codeExamplesAdapter;
