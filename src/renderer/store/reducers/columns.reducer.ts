import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';
import * as R from 'ramda';
import { actions as tagsActions } from './tags.reducer';

const columnsAdapter = createEntityAdapter<ColumnRO>({
  selectId: (column) => column?.id || '',
  sortComparer: (a, b) => (b?.creationDate || 0) - (a?.creationDate || 0),
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } =columnsAdapter;

const mergeBeforeUpdate = R.compose(
  R.mergeDeepRight({ id: uuidv4() }),
  R.mergeDeepRight({ creationDate: Date.now() }),
  R.mergeDeepLeft({ modificationDate: Date.now() }),
  R.evolve({
    metadata: {
      tags: R.map((item) => (R.is(String, item) ? item : item.id)),
    },
  }),
  R.mergeDeepRight({ metadata: { tags: [] } }),
  R.omit(['referances']),
);

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ColumnRO, meta?: { viewId?: string }) {
        return {
          payload: mergeBeforeUpdate(payload),
          meta,
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: ColumnRO[], meta: { viewId?: string }) {
        return {
          payload: payload.map((item) => mergeBeforeUpdate(item)),
          meta,
        };
      },
    },
    updateTags: (
      state,
      action: { payload: { columnId: string; tags: string[] } }
    ) => {
      const updatedColumn = state.entities[action.payload.columnId];
      if (updatedColumn) {
        updatedColumn.metadata.tags = action.payload.tags;
      }
    },
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(tagsActions.upsertOne, (state, action) => {
        if (action.meta.columnId) {
          state.entities[action.meta.columnId]?.metadata?.tags.push(
            action.payload.id
          );
        }
      })
      .addMatcher(columnsSlice.actions.updateTags.match, (state, action) => {
        const updatedColumn = state.entities[action.payload.columnId];
        if (updatedColumn !== undefined) {
          updatedColumn.modificationDate = Date.now();
        }
      });
  },
});

export const { actions, reducer, name } = columnsSlice;
export const { getSelectors } = columnsAdapter;
