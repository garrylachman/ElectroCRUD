import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { AccountRO } from 'renderer/defenitions/record-object';
import { BaseRequest } from 'renderer/ipc/base-request';
import {
  ConnectRequest,
  ConnectResponse,
  ErrorResponse,
  IPCChannelEnum,
} from '@electrocrud/shared';

import {
  CodeExamplesReducer,
  ColumnsReducer,
  ColumnsReferanceReducer,
  SessionReducer,
  SettingsReducer,
  TagsReducer,
  TemporaryFilterRulesReducer,
  TemporaryFiltersReducer,
  ToastReducer,
  ViewDetailsReducer,
  ViewsReducer,
} from './reducers';

export function* setIsConnected(action: { payload: { account: AccountRO } }) {
  const request: ConnectRequest = {
    body: {
      client: action.payload.account.client,
      connection: action.payload.account.connection,
      tunnel: action.payload.account.tunnel,
    },
    channel: IPCChannelEnum.CONNECT,
  };
  const result: ConnectResponse = yield BaseRequest<ConnectResponse>(
    request.channel,
    request
  ) as any;
  yield result.body === true
    ? put(SessionReducer.actions.setActive({ isConnected: true }))
    : [
        yield put(SessionReducer.actions.setActive({ isConnected: false })),
        yield put(
          ToastReducer.actions.setToast({
            status: 'error',
            title: `IPC Error on channel: ${result.channel}`,
            description: (result as unknown as ErrorResponse).error.message,
          })
        ),
      ];
}

export function* watchSetAccountAsync() {
  yield takeEvery(SessionReducer.actions.setAccount, setIsConnected);
}

function* notifyIfConnected(action: PayloadAction<{ isConnected: boolean }>) {
  if (action.payload.isConnected) {
    yield put(
      ToastReducer.actions.setToast({
        status: 'success',
        title: 'Connected',
        description: `Connected to account's database`,
      })
    );
  }
}

function* notifyEntityAddedOrEdited(
  action: PayloadAction<{
    id: string;
    title?: string;
    name?: string;
    label?: string;
  }>
) {
  const description = `'${
    action.payload.name ||
    action.payload.title ||
    action.payload.label ||
    action.payload.id ||
    'Entity'
  }' has been saved.`;

  yield put(
    ToastReducer.actions.setToast({
      status: 'success',
      title: 'Saved',
      description,
    })
  );
}

function* notifyEntityDeleted(action: PayloadAction<string>) {
  const description = `Item id '${action.payload}' has been deleted.`;

  yield put(
    ToastReducer.actions.setToast({
      status: 'warning',
      title: 'Deleted',
      description,
    })
  );
}

function* onFilterCreated(action) {
  if (action.meta && action.meta.new) {
    yield put(
      TemporaryFilterRulesReducer.actions.upsertOne({
        filterId: action.payload.id,
        column: undefined,
        opr: undefined,
        value: undefined,
      })
    );
  }
}

export function* watchForNotificationsAsync() {
  yield takeEvery(SessionReducer.actions.setActive, notifyIfConnected);
  yield takeEvery(ViewsReducer.actions.addOne, notifyEntityAddedOrEdited);
  yield takeEvery(ViewsReducer.actions.updateOne, notifyEntityAddedOrEdited);
  yield takeEvery(TagsReducer.actions.upsertOne, notifyEntityAddedOrEdited);
  // @ts-ignore
  yield takeEvery(ColumnsReducer.actions.upsertOne, notifyEntityAddedOrEdited);
  yield takeEvery(
    ViewDetailsReducer.actions.upsertOne,
    notifyEntityAddedOrEdited
  );
  yield takeEvery(
    ColumnsReferanceReducer.actions.upsertOne,
    notifyEntityAddedOrEdited
  );
  yield takeEvery(
    CodeExamplesReducer.actions.upsertOne,
    notifyEntityAddedOrEdited
  );
  // @ts-ignore
  yield takeEvery(CodeExamplesReducer.actions.removeOne, notifyEntityDeleted);
  yield takeEvery(TemporaryFiltersReducer.actions.upsertOne, onFilterCreated);
  // @ts-ignore
  yield takeEvery(SettingsReducer.actions.update, notifyEntityAddedOrEdited);
}
