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

export type ViewScopedContextType = {
  viewState?: ViewVO | NestedPartial<ViewVO>;
  setView: (viewId: string) => void;
};

const initial: ViewScopedContextType = {
  setView: (viewId) => {},
  viewState: undefined,
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

  const viewsStateSelector = useSelector((state) =>
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

  return (
    <ViewScopedContext.Provider value={{ viewState, setView }}>
      {children}
    </ViewScopedContext.Provider>
  );
};
