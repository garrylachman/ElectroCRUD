import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { StrictTagRO, TagRO } from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const tagsAdapter = createEntityAdapter<StrictTagRO>({
  selectId: (tag) => tag.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } = tagsAdapter;

const tagsSlice = createSlice({
  name: 'tags',
  initialState: tagsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(
        payload: TagRO,
        meta: { viewId?: string; columnId?: string } = {}
      ) {
        return {
          payload: prepareStateUpdate<StrictTagRO>(payload),
          meta,
        };
      },
    },
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    createLastModificationMatcher<TagRO>(
      builder,
      isAnyOf(tagsSlice.actions.upsertOne.match),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = tagsSlice;
export const { getSelectors } = tagsAdapter;
