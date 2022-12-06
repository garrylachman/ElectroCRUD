import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ColumnReferanceRO } from 'renderer/defenitions/record-object';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const columnReferanceAdapter = createEntityAdapter<ColumnReferanceRO>({
  selectId: (columnReferance) => columnReferance?.id || '',
  sortComparer: (a, b) => (b?.creationDate || 0) - (a?.creationDate || 0),
});

const { upsertOne, upsertMany, removeOne, removeMany, removeAll } =
  columnReferanceAdapter;

const columnReferanceSlice = createSlice({
  name: 'columnReferance',
  initialState: columnReferanceAdapter.getInitialState(),
  reducers: {
    upsertOne: {
      reducer: upsertOne,
      prepare(payload: ColumnReferanceRO) {
        return {
          payload: {
            ...payload,
            id: payload.id || uuidv4(),
            creationDate: payload.creationDate || Date.now(),
          },
        };
      },
    },
    upsertMany: {
      reducer: upsertMany,
      prepare(payload: ColumnReferanceRO[]) {
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
  extraReducers: (builder) => {
    builder.addMatcher(
      columnReferanceSlice.actions.upsertOne.match,
      (state, action) => {
        const updatedColumnReferance = state.entities[action.payload.id];
        if (updatedColumnReferance !== undefined) {
          updatedColumnReferance.modificationDate = Date.now();
        }
      }
    );
  },
});

export const { actions, reducer, name } = columnReferanceSlice;
export const { getSelectors } = columnReferanceAdapter;
