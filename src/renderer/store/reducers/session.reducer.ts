import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountRO, SessionRO } from 'renderer/defenitions/record-object';

export const initialState: SessionRO = {
  account: undefined,
  isConnected: false,
  isEditMode: true,
  isLoggedIn: false,
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
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { actions, reducer, name } = sessionSlice;
