import { IPCChannel } from './ipc.def';
import {
  ConnectArgs,
  DeleteDataArgs,
  InsertDataArgs,
  ReadDataArgs,
  ReadWidgetDataArgs,
  UpdateDataArgs,
} from './server.def';

export type BaseRequest<T = undefined> = {
  channel: IPCChannel;
  body?: T;
};

export type BaseBodyRequest<T> = Required<BaseRequest<T>>;

export type TablesListRequest = BaseRequest;

export type TableInfoRequest = BaseBodyRequest<string>;

export type ConnectRequest = BaseBodyRequest<ConnectArgs>;

export type HeartBeatRequest = BaseRequest;

export type ReadDataRequest = BaseBodyRequest<ReadDataArgs>;

export type ReadWidgetDataRequest = BaseBodyRequest<ReadWidgetDataArgs>;

export type InsertRequest = BaseBodyRequest<InsertDataArgs>;

export type DeleteRequest = BaseBodyRequest<DeleteDataArgs>;

export type UpdateRequest = BaseBodyRequest<UpdateDataArgs>;

export type RequestType =
  | TablesListRequest
  | TableInfoRequest
  | ConnectRequest
  | HeartBeatRequest
  | ReadDataRequest
  | ReadWidgetDataRequest
  | InsertRequest
  | DeleteRequest
  | UpdateRequest;
