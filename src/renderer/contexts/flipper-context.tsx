/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import type { FlipperPluginConnection, FlipperClient } from 'js-flipper';

// DOCS_START_CLIENT_START
// We want to import and start flipper client only in development and test modes
let flipperClientPromise: Promise<FlipperClient> | undefined;
if (process.env.NODE_ENV !== 'production') {
  flipperClientPromise = import('js-flipper').then(({ flipperClient }) => {
    flipperClient.start('ElectroCrud');
    return flipperClient;
  });
}

export type FlipperContextProviderProperties = {};

export const FlipperContext = createContext(undefined);

export const FlipperContextProvider: FC<
  PropsWithChildren<FlipperContextProviderProperties>
> = () => {
  // Flipper connection instance
  const [connection, setConnection] = useState<
    FlipperPluginConnection | undefined
  >();

  useEffect(() => {
    flipperClientPromise?.then((flipperClient) => {
      flipperClient.addPlugin({
        getId() {
          return 'ElectroCrud';
        },
        onConnect(connection_) {
          // Once we connected, we display it to the user
          setConnection(connection_);

          connection?.send('GetState');
        },
        onDisconnect() {
          setConnection(undefined);
        },
      });
    });
  }, []);

  return <FlipperContext.Provider value={} />;
};
