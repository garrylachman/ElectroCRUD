import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export enum TagType {
  TABLE,
  COLUMN,
}

export type TagRO = BaseRO & {
  label: string;
  type: TagType;
  color?: string;
};

export type StrictTagRO = Object.Required<TagRO, 'id' | 'creationDate'>;
