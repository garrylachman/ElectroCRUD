import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountRO, SessionRO } from 'renderer/defenitions/record-object';

const initialState: SessionRO = {
  account: undefined,
  isConnected: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<{ account: AccountRO }>) => {
      state.account = action.payload.account;
      state.isConnected = false;
    },
    setActive: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { actions, reducer, name } = sessionSlice;
