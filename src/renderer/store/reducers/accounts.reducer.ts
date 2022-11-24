import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AccountRO } from 'renderer/defenitions/record-object';
import { NestedPartial } from 'shared';

const accountsAdapter = createEntityAdapter<AccountRO>({
  selectId: (account) => account.id,
  sortComparer: (a, b) => b.creationDate - a.creationDate,
});

const { addOne, updateOne, updateMany, removeOne, removeMany, removeAll } =
  accountsAdapter;

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsAdapter.getInitialState(),
  reducers: {
    addOne: {
      reducer: addOne,
      prepare(payload: NestedPartial<AccountRO>) {
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
      prepare(payload: AccountRO): {
        payload: AccountRO & { changes: AccountRO };
      } {
        return {
          payload: {
            ...payload,
            modificationDate: Date.now(),
            changes: {
              ...payload,
              modificationDate: Date.now(),
            },
          },
        };
      },
    },
    updateMany,
    removeOne,
    removeMany,
    removeAll,
  },
});

export const { actions, reducer, name } = accountsSlice;
export const { getSelectors } = accountsAdapter;
