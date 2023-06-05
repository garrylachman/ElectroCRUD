// @ts-nocheck
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { RootState } from '../store';

export const getTagsByIds = R.curry((state: RootState) =>
  R.compose<string[]>(
    (ids: string[]) => R.props(ids, state.tags.entities),
    R.binary((a: string[]) => a || [])
  )
);
