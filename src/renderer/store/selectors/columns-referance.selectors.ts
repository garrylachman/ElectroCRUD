import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import {
  ViewRO,
  ColumnRO,
  ColumnReferanceRO,
} from 'renderer/defenitions/record-object';
import * as R from 'ramda';
import { RootState } from '../store';
import { getTagsByIds } from './tags.selectors';
import { enrichColumsRelations } from './views.selectors';

export const getAllColumnReferance = memoize(
  (state) => R.values(state.columnReferance.entities) as ColumnReferanceRO[]
);

export const createColumnReferanceByFromColumnSelector = R.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: RootState) =>
      R.filter(
        (item) => item.from === columnId,
        R.values(state.columnReferance.entities)
      )
    )(rootState)
);

export const createColumnSelector = R.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: RootState) => state.columns.entities[columnId])(rootState)
);

export const getColumns = R.curry((state: RootState, columnIds: string[]) =>
  R.props(columnIds, state.columns.entities)
);

export const enrichColumns = (state: RootState) =>
  R.map((column: ColumnRO) =>
    R.mergeDeepRight(column, {
      metadata: {
        tags: getTagsByIds(state)(column.metadata.tags),
      },
      referances: R.values(
        R.filter(
          (info: ColumnReferanceRO) => info.from === column.id,
          state.columnReferance.entities
        )
      ),
    })
  );

export const enrichColumnsForView = R.curry((state: RootState) =>
  R.compose<cstring[]>(enrichColumsRelations(state), enrichColumns(state))
);
