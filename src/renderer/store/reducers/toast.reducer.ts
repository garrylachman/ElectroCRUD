import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastOptions } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const initialState: Partial<ToastOptions> = {};

const toastDefault: Partial<ToastOptions> = {
  status: 'default',
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
      reducer: (state, action: PayloadAction<{ toast: ToastOptions }>) => {
        return action.payload;
      },
      prepare(payload: Partial<ToastOptions>) {
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
