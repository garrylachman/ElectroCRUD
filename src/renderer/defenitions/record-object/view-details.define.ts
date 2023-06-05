import { O } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export type ViewDetailsRO = O.Merge<
  BaseRO,
  {
    viewId: string;
    properties: Record<string, any>[];
  }
>;

export type StrictViewDetailsRO = O.Required<
  ViewDetailsRO,
  'id' | 'creationDate'
>;
