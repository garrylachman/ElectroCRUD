/* eslint-disable @typescript-eslint/no-empty-function */
import memoize from 'proxy-memoize';
import { createContext, FC, PropsWithChildren, useState } from 'react';

export type ScopeContextType = {
  getValue: (key: string) => string | undefined;
  setValue: (key: string, value?: string) => void;
  memState: Record<string, string | undefined>;
};

const initial: ScopeContextType = {
  getValue: (key: string) => key,
  setValue: (key: string, value?: string) => {},
  memState: {},
};

export type ScopeContextProviderProperties = {
  name: string;
};

export const ScopeContext = createContext<ScopeContextType>(initial);

export const ScopeContextProvider: FC<
  PropsWithChildren<ScopeContextProviderProperties>
> = ({ name, children }) => {
  const [state, setState] = useState<Record<string, string | undefined>>({});

  const getValue = (key: string) => state[key];
  const setValue = (key: string, value: string | undefined) =>
    setState((previous) => ({ ...previous, [key]: value }));

  const memState = memoize(
    (state_: Record<string, string | undefined>) => state_
  )(state);

  return (
    <ScopeContext.Provider value={{ getValue, setValue, memState }}>
      {children}
    </ScopeContext.Provider>
  );
};
