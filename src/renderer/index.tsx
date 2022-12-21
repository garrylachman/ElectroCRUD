import '@fontsource/poppins';
import 'renderer/assets/css/App.css';

import { ChakraProvider } from '@chakra-ui/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container as ModalContainer } from 'react-modal-promise';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { NotificationsContainer } from './containers/notifications-container';
import { EntitiesIndexerContextProvider } from './contexts';
import { router } from './router';
import store, { persistor } from './store/store';
import theme from './theme/theme';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <EntitiesIndexerContextProvider
        mappers={[
          { watchState: 'views', watchValue: 'name' },
          { watchState: 'columns', watchValue: 'name' },
        ]}
      >
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <ModalContainer isAppendIntances />
            <React.StrictMode>
              <RouterProvider router={router} />
            </React.StrictMode>
            <NotificationsContainer />
          </ChakraProvider>
        </PersistGate>
      </EntitiesIndexerContextProvider>
    </Provider>
  </React.StrictMode>
);
