/* eslint-disable @typescript-eslint/no-empty-function */
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
import { StrictViewVO } from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

export type ViewScopedContextType = {
  viewState?: StrictViewVO;
  setView: (viewId: string) => void;
  hasPrimaryKey: boolean;
};

const initial: ViewScopedContextType = {
  setView: (viewId) => {},
  viewState: undefined,
  hasPrimaryKey: false,
};

export type ViewScopedContextProviderProperties = {
  viewId?: string;
};

export const ViewScopedContext = createContext<ViewScopedContextType>(initial);

export const ViewScopedContextProvider: FC<
  PropsWithChildren<ViewScopedContextProviderProperties>
> = ({ viewId, children }) => {
  const sessionState = useAppSelector((state) => state.session);
  const [currentViewId, setCurrentViewId] = useState<string | undefined>(
    viewId
  );

  useEffect(() => setCurrentViewId(viewId), [viewId]);

  const viewsStateSelector = useSelector((state: RootState) =>
    ViewSelectors.createFullViewSelector(state)
  );

  const viewState = useMemo<StrictViewVO>(
    () =>
      currentViewId
        ? viewsStateSelector(currentViewId)
        : ({ accountId: sessionState.account?.id } as StrictViewVO),
    [currentViewId, viewsStateSelector]
  );

  const setView = useCallback(
    (setViewId: string) => setCurrentViewId(setViewId),
    []
  );

  const hasPrimaryKey = useMemo(() => {
    if (viewState && viewState.columns) {
      return viewState.columns.some((column) => column.is_primary_key);
    }
    return false;
  }, [viewState]);

  return (
    <ViewScopedContext.Provider value={{ viewState, setView, hasPrimaryKey }}>
      {children}
    </ViewScopedContext.Provider>
  );
};
