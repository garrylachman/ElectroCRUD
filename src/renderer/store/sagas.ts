import { put, takeEvery } from 'redux-saga/effects';
import {
  AccountRO,
  CodeExampleRO,
  ViewRO,
} from 'renderer/defenitions/record-object';
import { BaseRequest } from 'renderer/ipc/baseRequest';
import { ConnectRequest, ConnectResponse, IPCChannelEnum } from 'shared';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CodeExamplesReducer,
  SessionReducer,
  ToastReducer,
  ViewsReducer,
} from './reducers';

export function* setIsConnected(action: { payload: { account: AccountRO } }) {
  const req: ConnectRequest = {
    body: {
      client: action.payload.account.client,
      connection: action.payload.account.connection,
    },
    channel: IPCChannelEnum.CONNECT,
  };
  const result: ConnectResponse = yield BaseRequest<ConnectResponse>(
    req.channel,
    req
  ) as any;
  if ((result as ConnectResponse)?.body) {
    yield put(SessionReducer.actions.setActive({ isConnected: true }));
  } else {
    yield put(SessionReducer.actions.setActive({ isConnected: false }));
  }
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
  action: PayloadAction<{ id: string; title?: string; name?: string }>
) {
  const description = `'${
    action.payload.name || action.payload.title
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

export function* watchForNotificationsAsync() {
  yield takeEvery(SessionReducer.actions.setActive, notifyIfConnected);
  yield takeEvery(ViewsReducer.actions.addOne, notifyEntityAddedOrEdited);
  yield takeEvery(ViewsReducer.actions.updateOne, notifyEntityAddedOrEdited);
  yield takeEvery(
    CodeExamplesReducer.actions.upsertOne,
    notifyEntityAddedOrEdited
  );
  yield takeEvery(CodeExamplesReducer.actions.removeOne, notifyEntityDeleted);
}
