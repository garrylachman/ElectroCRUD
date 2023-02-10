// @ts-nocheck
import memoize from 'proxy-memoize';
import * as R from 'ramda';

import { RootState } from '../store';

export const createCodeExamplesForViewSelector = memoize((state: RootState) =>
  R.compose((viewId: string) =>
    R.filter(
      (item) => item?.viewId === viewId,
      R.values(state.codeExamples.entities)
    )
  )
);
