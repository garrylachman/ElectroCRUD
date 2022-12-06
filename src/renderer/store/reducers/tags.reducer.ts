import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TagRO } from 'renderer/defenitions/record-object';

const tagsAdapter = createEntityAdapter<TagRO>({
  selectId: (tag: TagRO) => tag?.id || '',
  sortComparer: (a, b) => (b?.creationDate || 0) - (a?.creationDate || 0),
});

const { addOne, upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  tagsAdapter;

const tagsSlice = createSlice({
  name: 'tags',
  initialState: tagsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: TagRO, meta: { viewId?: string; columnId?: string }) {
        return {
          payload: {
            ...payload,
            id: payload.id || uuidv4(),
            creationDate: payload.creationDate || Date.now(),
            modificationDate: Date.now(),
          },
          meta,
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
