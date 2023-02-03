import { IPCChannel } from './ipc.define';
import {
  ConnectArguments,
  DeleteDataArguments,
  InsertDataArguments,
  ReadDataArguments,
  ReadWidgetDataArguments,
  TunnelArguments,
  UpdateDataArguments,
} from './server.define';

export type BaseRequest<T = undefined> = {
  channel: IPCChannel;
  body?: T;
};

export type BaseBodyRequest<T> = Required<BaseRequest<T>>;

export type TablesListRequest = BaseRequest;

export type TableInfoRequest = BaseBodyRequest<string>;

export type ConnectRequest = BaseBodyRequest<ConnectArguments>;

export type CheckTunnelRequest = BaseBodyRequest<TunnelArguments>;

export type HeartBeatRequest = BaseRequest;

export type ReadDataRequest = BaseBodyRequest<ReadDataArguments>;

export type ReadWidgetDataRequest = BaseBodyRequest<ReadWidgetDataArguments>;

export type InsertRequest = BaseBodyRequest<InsertDataArguments>;

export type DeleteRequest = BaseBodyRequest<DeleteDataArguments>;

export type UpdateRequest = BaseBodyRequest<UpdateDataArguments>;

export type RequestType =
  | TablesListRequest
  | TableInfoRequest
  | ConnectRequest
  | HeartBeatRequest
  | ReadDataRequest
  | ReadWidgetDataRequest
  | InsertRequest
  | DeleteRequest
  | UpdateRequest
  | CheckTunnelRequest;
