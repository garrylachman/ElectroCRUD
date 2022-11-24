import { BaseRO } from './base.def';

export enum TagType {
  TABLE,
  COLUMN,
};

export type TagRO = BaseRO & {
  label: string;
  type: TagType;
  color?: string;
};

