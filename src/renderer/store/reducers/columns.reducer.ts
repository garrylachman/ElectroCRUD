import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as R from 'ramda';
import {
  ColumnRO,
  StrictColumnRO,
  TagRO,
} from 'renderer/defenitions/record-object';

import {
  AnyActionWithPayload,
  createLastModificationMatcher,
  prepareStateUpdate,
} from './helpers';
import { actions as tagsActions } from './tags.reducer';

const columnsAdapter = createEntityAdapter<StrictColumnRO>({
  selectId: (column) => column.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  columnsAdapter;

const mergeBeforeUpdate = (value: Partial<ColumnRO>): Partial<ColumnRO> => {
  let newValue = { ...value };
  if (!newValue.metadata) {
    newValue = {
      metadata: {
        tags: [],
      },
      ...value,
    };
  }

  const result = R.compose(
    R.evolve({
      metadata: {
        tags: R.map((item: TagRO | string) =>
          R.is(String, item) ? item : item.id
        ),
      },
    })
  )(newValue);

  return R.omit(['referances'], result) as Partial<ColumnRO>;
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ColumnRO, meta?: { viewId?: string }) {
        return {
          payload: prepareStateUpdate<StrictColumnRO>(
            mergeBeforeUpdate(payload)
          ),
          meta,
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: ColumnRO[], meta: { viewId?: string }) {
        return {
          payload: payload.map((item) =>
            prepareStateUpdate<StrictColumnRO>(mergeBeforeUpdate(item))
          ),
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
        if (updatedColumn.metadata === undefined) {
          updatedColumn.metadata = {
            tags: [],
          };
        }
        updatedColumn.metadata.tags = action.payload.tags;
      }
    },
    removeOne,
    removeMany,
    removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(tagsActions.upsertOne, (state, action) => {
      if (action.meta.columnId) {
        const updateColumn = state.entities[action.meta.columnId];
        if (updateColumn) {
          updateColumn.metadata.tags.push(action.payload.id);
        }
      }
    });

    createLastModificationMatcher<ColumnRO>(
      builder,
      isAnyOf(
        columnsSlice.actions.updateTags.match,
        columnsSlice.actions.upsertOne.match,
        columnsSlice.actions.upsertMany.match
      ),
      (action: AnyActionWithPayload) =>
        action.type === columnsSlice.actions.updateTags.type
          ? (action.payload.columnId as string)
          : (action.payload.id as string)
    );
  },
});

export const { actions, reducer, name } = columnsSlice;
export const { getSelectors } = columnsAdapter;
