import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UseToastOptions } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const initialState: Partial<UseToastOptions> = {};

const toastDefault: Partial<UseToastOptions> = {
  status: 'info',
  duration: 5000,
  position: 'top-right',
  isClosable: true,
  variant: 'solid',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: {
      reducer: (state, action: PayloadAction<UseToastOptions>) => {
        return action.payload;
      },
      prepare(payload: Partial<UseToastOptions>) {
        return {
          payload: {
            ...toastDefault,
            ...payload,
            id: uuidv4(),
          },
        };
      },
    },
  },
});

export const { actions, reducer, name } = toastSlice;
