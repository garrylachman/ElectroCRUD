import { filtersSlice } from './filters.reducer';

export const { actions, reducer, name } = filtersSlice('temporaryFilters');

export { getSelectors } from './filters.reducer';
