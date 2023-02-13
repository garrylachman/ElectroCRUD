import { QueryWhereOprEnum } from '@electrocrud/shared';
import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export type FilterRuleValue = string | number | undefined;

export type FilterRO = BaseRO & {
  parentId?: string;
  and: boolean;
  viewId?: string;
};

export type StrictFilterRO = Object.Required<FilterRO, 'id' | 'creationDate'>;

export type FilterRuleRO = BaseRO & {
  filterId?: string;
  column?: string;
  opr?: QueryWhereOprEnum;
  value?: FilterRuleValue | FilterRuleValue[];
};

export type StrictFilterRuleRO = Object.Required<
  FilterRuleRO,
  'id' | 'creationDate'
>;

export type ViewFilterRO = BaseRO & {
  viewId?: string;
  name: string;
  knexFilter: string;
};

export type StrictViewFilterRO = Object.Required<
  ViewFilterRO,
  'id' | 'creationDate'
>;
