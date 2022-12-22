import { EntityState } from '@reduxjs/toolkit';
import { stat } from 'node:fs';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import {
  ColumnReferanceRO,
  StrictColumnReferanceRO,
  StrictViewRO,
  ViewRO,
} from 'renderer/defenitions/record-object';

import { ColumnsReferanceReducer, ViewsReducer } from '../reducers';
import { RootState } from '../store';

const getViewById = R.curry((state: EntityState<StrictViewRO>, id: string) =>
  memoize((viewState: EntityState<StrictViewRO>) => {
    return ViewsReducer.getSelectors().selectById(viewState, id);
  })(state)
);

export const createColumnReferanceWithNames = R.curry(
  (rootState: RootState, columnReferanceIds: string[]) =>
    memoize((state: RootState) => {
      return R.compose(
        R.map(
          R.evolve({
            fromView: getViewById(state.views),
            toView: getViewById(state.views),
          })
        ),
        R.map((id: string) =>
          ColumnsReferanceReducer.getSelectors().selectById(
            state.columnReferance,
            id
          )
        )
      )(columnReferanceIds);
    })(rootState)
);

export const createColumnReferanceByFromColumnSelector = R.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: EntityState<StrictColumnReferanceRO>) =>
      R.filter((item) => item?.from === columnId, R.values(state.entities))
    )(rootState.columnReferance)
);
