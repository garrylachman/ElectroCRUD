import { QueryWhereOprEnum } from 'shared';

import { BaseRO } from './base.def';

export type FilterRuleValue = string | number | undefined;

export type FilterRO = BaseRO & {
  parentId?: string;
  and: boolean;
  viewId?: string;
};

export type FilterRuleRO = BaseRO & {
  filterId?: string;
  column?: string;
  opr?: QueryWhereOprEnum;
  value?: FilterRuleValue | FilterRuleValue[];
};

export type ViewFilterRO = BaseRO & {
  viewId?: string;
  name: string;
  knexFilter: string;
};
