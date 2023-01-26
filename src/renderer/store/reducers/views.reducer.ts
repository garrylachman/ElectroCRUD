/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as R from 'ramda';
import { StrictViewRO, ViewRO } from 'renderer/defenitions/record-object';

import { actions as columnsActions } from './columns.reducer';
import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const viewsAdapter = createEntityAdapter<StrictViewRO>({
  selectId: (view) => view.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const {
  addOne,
  updateOne,
  updateMany,
  removeOne,
  removeMany,
  removeAll,
  upsertOne,
} = viewsAdapter;

const mergeBeforeUpdate = (value: Partial<ViewRO>): Partial<ViewRO> => {
  const result = R.compose(
    R.mergeDeepRight({
      columns: [],
      metadata: { md: '' },
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
    updateMany,
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    builder
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
        columnsActions.upsertOne.match,
        columnsActions.upsertMany.match
      ),
      (action) =>
        action.type === viewsSlice.actions.updateOne.type ||
        viewsSlice.actions.upsertOne.type
          ? action.payload.id
          : action.payload.viewId
    );
  },
});

export const { actions, reducer, name } = viewsSlice;
export const { getSelectors } = viewsAdapter;
