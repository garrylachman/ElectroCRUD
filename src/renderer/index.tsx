import React, { PropsWithChildren, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'renderer/assets/css/App.css';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import theme from './theme/theme';
import { router } from './router';
import store, { persistor } from './store/store';
import { useAppSelector } from './store/hooks';
import { NotificationsContainer } from './containers/NotificationsContainer';
import { Spinner } from '@chakra-ui/react'

TimeAgo.addDefaultLocale(en);

const promise = {
  then(tellSuspenceToContinue, throwAnError) {
    const ubsubscribe = store.subscribe(() => {
      if (store.getState()._persist.rehydrated) {
        ubsubscribe();
        tellSuspenceToContinue();
      }
    });
  },
};

const WithStateLoaded: FC<PropsWithChildren<any>> = ({ children }) => {
  const store = useAppSelector((state) => state);
  if (!store._persist.rehydrated) {
    throw promise;
  }
  return <>{children}</>;
};

const Routers = () => {
  const rootState = useAppSelector((state) => state);
  const getState = () => rootState;
  return <RouterProvider router={router(getState)} />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <React.Suspense fallback="Loading...">
              <WithStateLoaded>
                <Suspense fallback={<Spinner size="xl" />}>
                  <RouterProvider router={router(store)} />
                  <NotificationsContainer />
                </Suspense>
              </WithStateLoaded>
            </React.Suspense>
          </React.StrictMode>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
