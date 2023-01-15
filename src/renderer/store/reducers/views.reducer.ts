/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as R from 'ramda';
import {
  StrictViewRO,
  TagRO,
  ViewRO,
} from 'renderer/defenitions/record-object';

import { actions as columnsActions } from './columns.reducer';
import { createLastModificationMatcher, prepareStateUpdate } from './helpers';
import { actions as tagsActions } from './tags.reducer';

const viewsAdapter = createEntityAdapter<StrictViewRO>({
  selectId: (view) => view.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { addOne, updateOne, updateMany, removeOne, removeMany, removeAll, upsertOne } =
  viewsAdapter;

const mergeBeforeUpdate = (value: Partial<ViewRO>): Partial<ViewRO> => {
  const result = R.compose(
    R.evolve({
      metadata: {
        tags: R.map((item: TagRO | string) =>
          R.is(String, item) ? item : item.id
        ),
      },
    }),
    R.mergeDeepRight({
      columns: [],
      metadata: { tags: [], md: '' },
      permissions: { create: true, read: true, update: true, delete: true },
      terminology: { singular: undefined, plural: undefined },
    })
  )(value);
  return R.omit(['columns'], result) as Partial<ViewRO>;
};

const viewsSlice = createSlice({
  name: 'views',
  initialState: viewsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ViewRO) {
        return {
          payload: prepareStateUpdate<StrictViewRO>(mergeBeforeUpdate(payload)),
        };
      },
    },
    addOne: {
      reducer: addOne,
      prepare(payload: ViewRO) {
        return {
          payload: prepareStateUpdate<StrictViewRO>(mergeBeforeUpdate(payload)),
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
            changes: prepareStateUpdate<StrictViewRO>(
              mergeBeforeUpdate(payload)
            ),
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
            if (updatedView.columns === undefined) {
              updatedView.columns = [];
            }
            // eslint-disable-next-line unicorn/no-array-for-each
            action.payload.forEach((item) => {
              updatedView.columns.push(item.id);
            });
            updatedView.modificationDate = Date.now();
          }
        }
      });

    createLastModificationMatcher<ViewRO>(
      builder,
      isAnyOf(
        viewsSlice.actions.updateOne.match,
        viewsSlice.actions.upsertOne.match,
        viewsSlice.actions.updateTags.match,
        columnsActions.upsertOne.match,
        columnsActions.upsertMany.match
      ),
      (action) =>
        action.type === viewsSlice.actions.updateOne.type || viewsSlice.actions.upsertOne.type
          ? action.payload.id
          : action.payload.viewId
    );
  },
});

export const { actions, reducer, name } = viewsSlice;
export const { getSelectors } = viewsAdapter;
