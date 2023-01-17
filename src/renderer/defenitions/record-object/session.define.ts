import { AccountRO } from './account.define';

export type SessionRO = {
  account?: AccountRO;
  isConnected: boolean;
  isEditMode: boolean;
  isLoggedIn: boolean;
};
