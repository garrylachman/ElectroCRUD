import { EntityId, EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import {
  ViewRO,
  ColumnRO,
  ColumnReferanceRO,
  ViewVO,
} from 'renderer/defenitions/record-object';
import * as F from 'ramda';
import { RootState } from '../store';
import {
  enrichColumns,
  enrichColumnsForView,
  getColumn,
  getColumns,
} from './columns.selectors';
import { getTagsByIds } from './tags.selectors';
import { ColumnsReducer, ViewsReducer } from '../reducers';

export const getView = memoize((state) =>
  F.compose<string>(
    (view: ViewRO) =>
      F.mergeDeepRight(view, {
        metadata: {
          tags: getTagsByIds(state)(view?.metadata?.tags || []),
        },
      }),
    (viewId: string) =>
      F.mergeDeepRight(state.views.entities[viewId], {
        columns: getColumns(state)(state.views.entities[viewId]?.columns || []),
      })
  )
);

export const getColumnRelation = (state: RootState) =>
  F.map((info: ColumnReferanceRO) =>
    F.mergeDeepRight(info, {
      from: getColumn(state)(info.from),
      to: getColumn(state)(info.to),
      fromView: getView(state)(info.fromView),
      toView: getView(state)(info.toView),
    })
  );

export const enrichColumsRelations = (state: RootState) =>
  F.map((column: ColumnRO) =>
    F.mergeDeepRight(column, {
      referances: getColumnRelation(state)(
        column.referances as ColumnReferanceRO[]
      ),
    })
  );

export const getFullView = F.compose<{ state: RootState; viewId: string }>(
  ({ state, view }) =>
    F.mergeDeepRight(view, {
      columns: enrichColumnsForView(state)(view.columns),
    }),
  ({ state, viewId }) => ({
    state,
    view: getView(state)(viewId),
  })
);

export const createFullViewSelector = F.curry(
  (rootState: RootState, viewId: string) =>
    memoize((state: RootState) => getFullView({ state, viewId }) as ViewVO)(
      rootState
    )
);

export const getAllViews = F.curry((rootState: RootState) =>
  memoize((state: RootState) =>
    F.compose(F.map((viewId) => getFullView({ state, viewId })))(
      state.views.ids
    )
  )(rootState)
);

export const getViewSummary = F.curry((state: RootState) =>
  F.compose<string>(F.tap(console.log), (viewId: string) =>
    F.mergeDeepRight(state.views.entities[viewId])
  )
);

export const getAllViewsSummary = F.curry((rootState: RootState) =>
  memoize((state: RootState) =>
    F.compose(
      F.map((x) => F.mergeDeepRight(x, { columns: F.length(x.columns) })),
      F.map((x) => F.omit(['metadata', 'terminology', 'permissions'])(x)),
      F.map((x) => state.views.entities[x])
    )(state.views.ids)
  )(rootState)
);