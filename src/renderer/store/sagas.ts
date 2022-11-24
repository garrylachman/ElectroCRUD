import { put, takeEvery } from 'redux-saga/effects';
import { AccountRO, ViewRO } from 'renderer/defenitions/record-object';
import { BaseRequest } from 'renderer/ipc/baseRequest';
import { ConnectRequest, ConnectResponse, IPCChannelEnum } from 'shared';
import { PayloadAction } from '@reduxjs/toolkit';
import { SessionReducer, ToastReducer, ViewsReducer } from './reducers';

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

function* notifyView(action: PayloadAction<ViewRO>) {
  const title =
    action.type === ViewsReducer.actions.addOne.type
      ? 'View Added'
      : 'View Edited';
  const description =
    action.type === ViewsReducer.actions.addOne.type
      ? `'${action.payload.name}' has been added`
      : `'${action.payload.name}' has been edited`;

  yield put(
    ToastReducer.actions.setToast({
      status: 'success',
      title,
      description,
    })
  );
}

export function* watchForNotificationsAsync() {
  yield takeEvery(SessionReducer.actions.setActive, notifyIfConnected);
  yield takeEvery(ViewsReducer.actions.addOne, notifyView);
  yield takeEvery(ViewsReducer.actions.updateOne, notifyView);
}
