import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AccountRO, StrictAccountRO } from 'renderer/defenitions/record-object';

import { createLastModificationMatcher, prepareStateUpdate } from './helpers';

const accountsAdapter = createEntityAdapter<StrictAccountRO>({
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
      prepare(payload: AccountRO) {
        return {
          payload: prepareStateUpdate<StrictAccountRO>(payload),
        };
      },
    },
    updateOne: {
      reducer: updateOne,
      prepare(payload: AccountRO) {
        return {
          payload: {
            id: payload.id as string,
            name: payload.name,
            changes: prepareStateUpdate<StrictAccountRO>(payload),
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
    createLastModificationMatcher<AccountRO>(
      builder,
      isAnyOf(
        accountsSlice.actions.updateOne.match,
        accountsSlice.actions.addOne.match
      ),
      (action) => action.payload.id as string
    );
  },
});

export const { actions, reducer, name } = accountsSlice;
export const { getSelectors } = accountsAdapter;
