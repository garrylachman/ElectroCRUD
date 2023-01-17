import { O } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export type PasswordSettings = {
  enabled: boolean;
  hash: string;
  password?: string;
  passwordLenght?: number;
};

export type SettingsRO = O.Merge<
  BaseRO,
  {
    password: PasswordSettings;
  }
>;

export type StrictSettingsRO = O.Required<SettingsRO, 'id' | 'creationDate'>;
