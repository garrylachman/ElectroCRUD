import { EntityState, createSelector } from '@reduxjs/toolkit';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ViewVO } from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewSelectors } from 'renderer/store/selectors';
import { NestedPartial } from 'shared';
import * as R from 'ramda';
import { RootState } from 'renderer/store/store';

export type EntitiesIndexerContextType = {
  getById: (id: string) => string;
};

const initial: EntitiesIndexerContextType = {
  getById: (id: string) => id,
};

export type StateMapper = {
  watchState: string;
  watchValue: string;
};

export type EntitiesIndexerContextProviderProperties = {
  mappers: StateMapper[];
};

export const EntitiesIndexerContext =
  createContext<EntitiesIndexerContextType>(initial);

export const EntitiesIndexerContextProvider: FC<
  PropsWithChildren<EntitiesIndexerContextProviderProperties>
> = ({ mappers, children }) => {
  const selector = createSelector<Record<string, string>>(
    (state: RootState) => state,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (_, mappers: StateMapper[]) => mappers,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (state, mappers: StateMapper[]) =>
      R.mergeAll(
        R.map(
          ({ watchState, watchValue }): StateMapper =>
            R.map(
              (row) => row[watchValue],
              state[watchState].entities as EntityState<any>
            ),
          mappers
        )
      )
  );

  const state = useSelector<any, Record<string, string>>((state) =>
    selector(state, mappers)
  );

  const getById = useCallback<string | undefined>(
    (id: string) => state[id] || undefined
  );

  return (
    <EntitiesIndexerContext.Provider value={{ getById }}>
      {children}
    </EntitiesIndexerContext.Provider>
  );
};
