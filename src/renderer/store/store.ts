import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import {
  AccountsReducer,
  SessionReducer,
  ViewsReducer,
  ToastReducer,
  TagsReducer,
  CodeExamplesReducer,
  ColumnsReducer,
  ColumnsReferanceReducer,
} from './reducers';
import { watchSetAccountAsync, watchForNotificationsAsync } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [SessionReducer.name, ToastReducer.name],
};

const rootReducer = combineReducers({
  [AccountsReducer.name]: AccountsReducer.reducer,
  [SessionReducer.name]: SessionReducer.reducer,
  [TagsReducer.name]: TagsReducer.reducer,
  [ViewsReducer.name]: ViewsReducer.reducer,
  [ToastReducer.name]: ToastReducer.reducer,
  [CodeExamplesReducer.name]: CodeExamplesReducer.reducer,
  [ColumnsReducer.name]: ColumnsReducer.reducer,
  [ColumnsReferanceReducer.name]: ColumnsReferanceReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, sagaMiddleware],
});

sagaMiddleware.run(watchSetAccountAsync);
sagaMiddleware.run(watchForNotificationsAsync);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

export const persistor = persistStore(store);
