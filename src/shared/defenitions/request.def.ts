import { NestedPartial } from '.';
import { IPCChannel } from './ipc.def';
import { LogItem } from './log.def';
import {
  ConnectArgs,
  DeleteDataArgs,
  InsertDataArgs,
  ReadDataArgs,
  ReadWidgetDataArgs,
  UpdateDataArgs,
} from './server.def';

export type NoBodyRequest = {
  channel: IPCChannel;
};

export type BaseRequest<T = void> = NoBodyRequest & {
  body: NestedPartial<T>;
};

export type TablesListRequest = NoBodyRequest;

export type TableInfoRequest = BaseRequest<string>;

export type ConnectRequest = BaseRequest<ConnectArgs>;

export type HeartBeatRequest = NoBodyRequest;

export type ReadDataRequest = BaseRequest<ReadDataArgs>;

export type ReadWidgetDataRequest = BaseRequest<ReadWidgetDataArgs>;

export type InsertRequest = BaseRequest<InsertDataArgs>;

export type DeleteRequest = BaseRequest<DeleteDataArgs>;

export type UpdateRequest = BaseRequest<UpdateDataArgs>;

export type LogRequest = BaseRequest<LogItem>;

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
  | LogRequest;
