import { AccountRO } from './account.def';

export type SessionRO = {
  account?: AccountRO;
  isConnected: boolean;
};
