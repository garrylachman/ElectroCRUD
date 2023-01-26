import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { SettingsRO } from 'renderer/defenitions/record-object';
import { v4 } from 'uuid';

export const initialState: SettingsRO = {
  creationDate: Date.now(),
  modificationDate: Date.now(),
  id: v4(),
  password: {
    enabled: false,
    hash: v4(),
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<SettingsRO>>) => {
      state = merge(state, action.payload);
      state.modificationDate = Date.now();
    },
  },
});

export const { actions, reducer, name } = settingsSlice;
