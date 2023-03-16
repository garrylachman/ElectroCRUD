import { FC, lazy, PropsWithChildren } from "react"

const Suspend = lazy(() => new Promise(resolve => {}))

export type SuspenderProperties = PropsWithChildren<{ suspend: boolean }>;

export const Suspender :FC<SuspenderProperties> = ({ suspend, children }) => {
  if (suspend) {
    return <Suspend />
  }
  return (<>{children}</>);
};
