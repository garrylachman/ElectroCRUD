// @ts-nocheck
import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import {
  StrictColumnReferanceRO,
  StrictColumnReferanceWithViewsAndCoumnsRO,
  StrictColumnRO,
  StrictViewRO,
} from 'renderer/defenitions/record-object';

import { ColumnsReducer, ViewsReducer } from '../reducers';
import { RootState } from '../store';

const getViewById = R.curry((state: EntityState<StrictViewRO>, id: string) =>
  memoize((viewState: EntityState<StrictViewRO>) => {
    return ViewsReducer.getSelectors().selectById(
      viewState,
      id
    ) as StrictViewRO;
  })(state)
);

const getColumnById = R.curry(
  (state: EntityState<StrictColumnRO>, id: string) =>
    memoize((columnsState: EntityState<StrictColumnRO>) => {
      return ColumnsReducer.getSelectors().selectById(
        columnsState,
        id
      ) as StrictColumnRO;
    })(state)
);

export const createColumnReferanceWithNames = R.curry(
  (rootState: RootState, columnReferanceIds: Array<string>) =>
    memoize((state: RootState) => {
      return columnReferanceIds
        .map((itemId: string) => state.columnReferance.entities[itemId])
        .map((item) => ({
          ...item,
          fromView: getViewById(state.views, item?.fromView),
          toView: getViewById(state.views, item?.toView),
          from: getColumnById(state.columns, item?.from),
          to: getColumnById(state.columns, item?.to),
        })) as StrictColumnReferanceWithViewsAndCoumnsRO[];
    })(rootState)
);

export const createColumnReferanceByFromColumnSelector = R.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: EntityState<StrictColumnReferanceRO>) =>
      R.filter((item) => item?.from === columnId, R.values(state.entities))
    )(rootState.columnReferance)
);
