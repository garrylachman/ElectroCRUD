import '@fontsource/poppins';
import '@fontsource/dm-sans';
import '@inovua/reactdatagrid-community/index.css';
import './assets/css/App.css';
import '@electrocrud/tabs/lib/tabs.css';

import { Loader, SaasProvider } from '@saas-ui/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Container as ModalContainer } from 'react-modal-promise';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ECSpinner } from './components/icons';
import { NotificationsContainer } from './containers/notifications-container';
import { router } from './router';
import store, { persistor } from './store/store';
import theme from './theme/theme';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SaasProvider theme={theme}>
          <Suspense
            fallback={
              <Loader variant="fullscreen" isLoading spinner={<ECSpinner />}>
                Loading...
              </Loader>
            }
          >
            <ModalContainer isAppendIntances />
            <RouterProvider router={router} />
            <NotificationsContainer />
          </Suspense>
        </SaasProvider>
      </PersistGate>
    </Provider>
  </>
);
