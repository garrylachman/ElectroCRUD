/* eslint-disable @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import * as F from 'ramda';
import {
  ColumnReferanceRO,
  ColumnRO,
  ViewRO,
} from 'renderer/defenitions/record-object';

import { ColumnsReducer } from '../reducers';
import { RootState } from '../store';
import { getTagsByIds } from './tags.selectors';
import { enrichColumsRelations } from './views.selectors';

export const getAllColumns = memoize((state) => F.values(state) as ColumnRO[]);

export const getColumn = F.curry(
  (state: RootState, columnId: string) => state.columns.entities[columnId]
);

export const createColumnSelector = F.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: RootState) => state.columns.entities[columnId])(rootState)
);

export const createColumnForViewSelector = memoize(
  (state: RootState) =>
    F.compose(
      F.map((columnId) => state.columns.entities[columnId] as ColumnRO),
      (viewId: string) => state.views.entities[viewId]?.columns
    ) as ColumnRO[]
);

export const getColumns = memoize((state: RootState) =>
  F.compose<string[]>(
    F.map((id: string) =>
      ColumnsReducer.getSelectors().selectById(state.columns, id)
    ),
    F.intersection(state.columns.ids.map((value) => value ?? '-'))
  )
);

export const enrichColumns = (state: RootState) =>
  F.map((column: ColumnRO) =>
    F.mergeDeepRight(column, {
      metadata: {
        tags: getTagsByIds(state)(column?.metadata?.tags || []),
      },
      referances: F.values(
        F.filter((info: ColumnReferanceRO) => info.from === column.id)
      ),
    })
  );

export const enrichColumnsForView = F.curry((state: RootState) =>
  F.compose<cstring[]>(enrichColumsRelations(state), enrichColumns(state))
);
