import { filterRulesSlice } from './filter-rules.reducer';

export const { actions, reducer, name } = filterRulesSlice(
  'temporaryFilterRules'
);

export { getSelectors } from './filter-rules.reducer';
