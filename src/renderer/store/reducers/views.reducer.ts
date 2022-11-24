import { createSlice, createEntityAdapter, Update } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ViewRO } from 'renderer/defenitions/record-object';

const viewsAdapter = createEntityAdapter<ViewRO>({
  selectId: (view) => view.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { addOne, updateOne, updateMany, removeOne, removeMany, removeAll } =
  viewsAdapter;

const viewsSlice = createSlice({
  name: 'views',
  initialState: viewsAdapter.getInitialState(),
  reducers: {
    addOne: {
      reducer: addOne,
      prepare(payload: ViewRO) {
        return {
          payload: {
            ...payload,
            id: uuidv4(),
            creationDate: Date.now(),
            modificationDate: Date.now(),
          },
        };
      },
    },
    updateOne: {
      reducer: updateOne,
      prepare(payload: ViewRO): Update<ViewRO> {
        return {
          payload: {
            id: payload.id,
            name: payload.name,
            changes: {
              ...payload,
              modificationDate: Date.now(),
            },
          }
        };
      },
    },
    updateMany,
    removeOne,
    removeMany,
    removeAll,
  },
});

export const { actions, reducer, name } = viewsSlice;
export const { getSelectors } = viewsAdapter;
