// @ts-nocheck
/* eslint-disable @typescript-eslint/no-empty-function */
import { get, throttle } from 'underscore';
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
import { useUpdateEffect } from 'renderer/hooks';
import { useIPCReadData } from 'renderer/ipc';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewSelectors } from 'renderer/store/selectors';
import { IPCChannelEnum, NestedPartial, QueryOrder } from '@electrocrud/shared';
import { RootState } from 'renderer/store/store';

export type DashboardContextControlType = [
  execute: () => void,
  setLimit: (argument0: number) => void,
  setPage: (argument0: number) => void,
  setOrder: (argument0: QueryOrder) => void,
  setSearch: (argument0: string) => void,
  setFilter: (argument0: any) => void,
  setInited: (argument0: any) => void
];

export type DashboardContextDataMetaType = {
  totalCount: number;
  limit: number;
  page: number;
  order: QueryOrder;
};

export type DashboardContextType = {
  setView: (viewId: string) => void;
  data: {
    columns: any[];
    rows: any[];
    meta: DashboardContextDataMetaType;
  };
  control: DashboardContextControlType;
  status: [isLoading: boolean, isExecuted: boolean];
};

const initial: DashboardContextType = {
  setView: (viewId) => {},
  data: { columns: [], rows: [], meta: { totalCount: 0, limit: 10, page: 1 } },
  control: [
    () => {},
    (number) => {},
    (number) => {},
    (value) => {},
    (value) => {},
    (value) => {},
    (value) => {},
  ],
  status: [false, false],
};

export type DashboardContextProviderProperties = {
  viewId?: string;
};

export const DashboardContext = createContext<DashboardContextType>(initial);

export const DashboardContextProvider: FC<
  PropsWithChildren<DashboardContextProviderProperties>
> = ({ viewId, children }) => {
  const [inited, setInited] = useState(false);
  const sessionState = useAppSelector((state) => state.session);
  const [currentViewId, setCurrentViewId] = useState<string | undefined>(
    viewId
  );

  useEffect(() => setCurrentViewId(viewId), [viewId]);

  const viewsStateSelector = useSelector((state: RootState) =>
    ViewSelectors.createFullViewSelector(state)
  );

  const viewState = useMemo<ViewVO | NestedPartial<ViewVO>>(
    () =>
      currentViewId
        ? viewsStateSelector(currentViewId)
        : ({ accountId: sessionState.account?.id } as NestedPartial<ViewVO>),
    [currentViewId, viewsStateSelector]
  );

  const setView = useCallback((setViewId) => setCurrentViewId(setViewId), []);

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<QueryOrder>();
  const [search, setSearch] = useState<string>();
  const [filter, setFilter] = useState<any>();

  const columns = useMemo<string[]>(
    () =>
      viewState?.columns
        .filter((item) => item.enabled)
        .map<string>((item) => get(item, 'name', item)),
    [viewState.columns]
  );

  const searchColumns = useMemo<string[]>(
    () =>
      viewState?.columns
        .filter((item) => item.searchable && item.enabled)
        .map<string>((item) => get(item, 'name', item)),
    [viewState.columns]
  );

  const { result, execute, isExecuted, isLoading } = useIPCReadData({
    channel: IPCChannelEnum.READ_DATA,
    body: {
      table: viewState.table,
      columns,
      rows: limit,
      page,
      order: order || { column: 1, order: 'asc' },
      searchText: search,
      searchColumns,
      filter,
    },
  });

  const debouncedExecute = inited ? throttle(execute, 1000) : () => {};

  const control = [
    debouncedExecute,
    setLimit,
    setPage,
    setOrder,
    setSearch,
    setFilter,
    setInited,
  ];
  const status = [isLoading, isExecuted];
  const data = useMemo(
    () => ({
      columns,
      rows: result?.body?.data || [],
      meta: {
        totalCount: result?.body?.count || 0,
        limit,
        page,
        order,
      },
    }),
    [isExecuted, result?.body]
  );

  useEffect(() => {
    debouncedExecute();
  }, [inited]);

  useUpdateEffect(() => {
    debouncedExecute();
  }, [limit]);

  useUpdateEffect(() => {
    debouncedExecute();
  }, [page]);

  useUpdateEffect(() => {
    debouncedExecute();
  }, [order]);

  useUpdateEffect(() => {
    debouncedExecute();
  }, [search]);

  useUpdateEffect(() => {
    debouncedExecute();
  }, [filter]);

  return (
    <DashboardContext.Provider value={{ setView, data, control, status }}>
      {children}
    </DashboardContext.Provider>
  );
};
