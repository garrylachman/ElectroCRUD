import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TagRO } from 'renderer/defenitions/record-object';

const tagsAdapter = createEntityAdapter<TagRO>({
  selectId: (tag) => tag.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { addOne, upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  tagsAdapter;

const tagsSlice = createSlice({
  name: 'tags',
  initialState: tagsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: TagRO) {
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
    upsertOneTable: {
      reducer: upsertOne,
      prepare(payload: TagRO, viewId: string) {
        return {
          payload: {
            ...payload,
            id: payload.id || uuidv4(),
            creationDate: payload.creationDate || Date.now(),
            modificationDate: Date.now(),
          },
          meta: {
            viewId,
          },
        };
      },
    },
    removeOne,
    removeMany,
    removeAll,
  },
});

export const { actions, reducer, name } = tagsSlice;
export const { getSelectors } = tagsAdapter;
