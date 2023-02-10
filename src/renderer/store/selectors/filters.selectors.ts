/* eslint-disable @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { Dictionary, EntityState } from '@reduxjs/toolkit';
import { arrayToTree } from 'performant-array-to-tree';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import {
  FilterRO,
  FilterRuleRO,
  FilterRuleValue,
} from 'renderer/defenitions/record-object/filters.define';
import { ColumnRO } from 'renderer/defenitions/record-object/view.define';

import {
  TemporaryFilterRulesReducer,
  TemporaryFiltersReducer,
} from '../reducers';
import { RootState } from '../store';
import { getColumn } from './columns.selectors';

export type FiltersTree = {
  data?: FilterRO;
  rules?: FilterRuleRO[];
  children?: FiltersTree[];
};

type AndOr = 'and' | 'or';

export type FiltersComputedTree = Record<AndOr | string, Record<any | any[]>>;

const getFilterRulesState = memoize(
  (state: EntityState<FilterRuleRO>) => state
);

const withFilterRules = (
  filter: FiltersTree,
  state: EntityState<FilterRuleRO>,
  getColumnMemoize: (columnId: string) => ColumnRO
): FiltersComputedTree => {
  const filterId = filter.data?.id;
  const rules = TemporaryFilterRulesReducer.getSelectors().selectAll(state);

  const filtersWithRules = R.mergeLeft(
    {
      rules: R.filter(
        (item: FilterRuleRO) => item.filterId === filterId,
        rules
      ),
    },
    filter
  );

  const hasColumn = R.propIs(String, 'column');

  const filterLeaf = R.evolve(
    {
      children: R.map((child: FiltersTree) =>
        withFilterRules(child, state, getColumnMemoize)
      ),
      rules: R.map((rule: FilterRuleRO) =>
        R.mergeLeft(
          hasColumn(rule) ? { columnInfo: getColumnMemoize(rule.column) } : {},
          rule
        )
      ),
    },
    filtersWithRules
  );

  const filterAndOr: AndOr = filterLeaf.data?.and ? 'and' : 'or';
  return {
    [filterAndOr]: [
      ...filterLeaf.rules.map((rule) =>
        rule.columnInfo && rule.opr
          ? {
              [rule.columnInfo?.name]: { [rule.opr]: rule.value },
            }
          : {}
      ),
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...filterLeaf?.children,
    ],
  };
};

const getFiltersList = memoize((state: EntityState<FilterRO>) =>
  TemporaryFiltersReducer.getSelectors().selectAll(state)
);

export const createFiltersSelector = R.curry(
  (rootState: RootState, filterId: string): FiltersComputedTree =>
    memoize((state: RootState): FiltersComputedTree => {
      const filtersList = getFiltersList(state.temporaryFilters || []);
      const filtersTree: FiltersTree[] = memoize<FilterRO[], FiltersTree[]>(
        (mFiltersList) => arrayToTree(mFiltersList)
      )(filtersList);
      const getColumnMemoize = getColumn(state);

      const filter: FiltersTree | undefined = R.find(
        R.pathEq(['data', 'id'], filterId),
        filtersTree
      );

      if (!filter) {
        return;
      }

      return withFilterRules(
        filter,
        getFilterRulesState(state.temporaryFilterRules),
        getColumnMemoize
      );
    })(rootState)
);
