import { QueryWhereOprEnum } from 'shared';

import { BaseRO } from './base.def';

type FilterRuleValue = string | number | undefined;

export type FilterRO = BaseRO & {
  parentId?: string;
  and: boolean;
};

export type FilterRuleRO = BaseRO & {
  filterId?: string;
  column?: string;
  opr?: QueryWhereOprEnum;
  value?: FilterRuleValue | FilterRuleValue[];
};
