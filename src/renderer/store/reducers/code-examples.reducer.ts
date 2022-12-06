import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { CodeExampleRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';

const codeExamplesAdapter = createEntityAdapter<CodeExampleRO>({
  selectId: (codeExample) => codeExample?.id || '',
  sortComparer: (a, b) => (b?.creationDate || 0) - (a?.creationDate || 0),
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
          payload: {
            ...payload,
            id: payload.id || uuidv4(),
            creationDate: payload.creationDate || Date.now(),
            modificationDate: Date.now(),
          },
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: CodeExampleRO[]) {
        return {
          payload: payload.map((item) => ({
            ...item,
            id: item.id || uuidv4(),
            creationDate: item.creationDate || Date.now(),
            modificationDate: Date.now(),
          })),
        };
      },
    },
    removeOne,
    removeMany,
    removeAll,
  },
});

export const { actions, reducer, name } = codeExamplesSlice;
export const { getSelectors } = codeExamplesAdapter;
