import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export type CodeExampleRO = BaseRO & {
  viewId: string;
  title: string;
  description?: string;
  language: string;
  code: string;
};

export type StrictCodeExampleRO = Object.Required<
  CodeExampleRO,
  'id' | 'creationDate'
>;
