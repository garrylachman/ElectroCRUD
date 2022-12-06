/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { ViewRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import * as R from 'ramda';
import { actions as tagsActions } from './tags.reducer';
import { actions as columnsActions } from './columns.reducer';

const viewsAdapter = createEntityAdapter<ViewRO>({
  selectId: (view) => view?.id || '',
  sortComparer: (a, b) => (b?.creationDate || 0) - (a?.creationDate || 0),
});

const { addOne, updateOne, updateMany, removeOne, removeMany, removeAll } =
  viewsAdapter;

const mergeBeforeUpdate = R.compose(
  R.mergeDeepRight({ id: uuidv4() }),
  R.mergeDeepRight({ creationDate: Date.now() }),
  R.mergeDeepLeft({ modificationDate: Date.now() }),
  R.evolve({
    metadata: {
      tags: R.map((item) => (R.is(String, item) ? item : item.id)),
    },
  }),
  R.omit(['columns']),
  R.mergeDeepRight({ columns: [] }),
  R.mergeDeepRight({ terminology: { singular: undefined, plural: undefined } }),
  R.mergeDeepRight({ metadata: { tags: [] } }),
  R.mergeDeepRight({
    permissions: { create: true, read: true, update: true, delete: true },
  })
);

const viewsSlice = createSlice({
  name: 'views',
  initialState: viewsAdapter.getInitialState(),
  reducers: {
    addOne: {
      reducer: addOne,
      prepare(payload: ViewRO) {
        return {
          payload: mergeBeforeUpdate(payload),
        };
      },
    },
    updateOne: {
      reducer: updateOne,
      prepare(payload: ViewRO) {
        return {
          payload: {
            id: payload.id as string,
            name: payload.name,
            changes: mergeBeforeUpdate(payload),
          },
        };
      },
    },
    updateTags: (
      state,
      action: { payload: { viewId: string; tags: string[] } }
    ) => {
      const updatedView = state.entities[action.payload.viewId];
      if (updatedView) {
        updatedView.metadata.tags = action.payload.tags;
      }
    },
    updateMany,
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(tagsActions.upsertOne, (state, action) => {
        if (action.meta.viewId) {
          state.entities[action.meta.viewId]?.metadata?.tags.push(
            action.payload.id
          );
        }
      })
      .addCase(columnsActions.upsertOne, (state, action) => {
        if (action.meta && action.meta.viewId) {
          const updatedView = state.entities[action.meta.viewId];
          if (updatedView) {
            updatedView.columns.push(action.payload.id);
            updatedView.modificationDate = Date.now();
          }
        }
      })
      .addCase(columnsActions.upsertMany, (state, action) => {
        if (action.meta && action.meta.viewId) {
          const updatedView = state.entities[action.meta.viewId];
          if (updatedView) {
            updatedView.columns = [
              ...updatedView.columns,
              ...action.payload.map((item) => item.id),
            ];
            updatedView.modificationDate = Date.now();
          }
        }
      });
  },
});

export const { actions, reducer, name } = viewsSlice;
export const { getSelectors } = viewsAdapter;
