import { IPCChannel } from './ipc.def';
import { LogItem } from './log.def';
import {
  ReadDataResult,
  ReadWidgetDataResult,
  TableInfoRow,
} from './server.def';

export type BaseResponse = {
  channel: IPCChannel;
};

export type ErrorResponse = BaseResponse & {
  error: Error;
};

export type SuccessResponse<T> = BaseResponse & {
  body: T;
};

export type TablesListResponse = SuccessResponse<string[]>;

export type TableInfoResponse = SuccessResponse<TableInfoRow[]>;

export type ConnectResponse = SuccessResponse<boolean>;

export type HeartBeatResponse = SuccessResponse<boolean>;

export type ReadDataResponse = SuccessResponse<
  ReadDataResult<Record<string, any>>
>;

export type ReadWidgetDataResponse = SuccessResponse<
  ReadWidgetDataResult<number>
>;

export type InsertResponse = SuccessResponse<boolean>;

export type DeleteResponse = SuccessResponse<boolean>;

export type UpdateResponse = SuccessResponse<boolean>;

export type LogResponse = SuccessResponse<LogItem>;

export type ResponseType =
  | ErrorResponse
  | TablesListResponse
  | TableInfoResponse
  | ConnectResponse
  | HeartBeatResponse
  | ReadDataResponse
  | ReadWidgetDataResponse
  | InsertResponse
  | DeleteResponse
  | UpdateResponse
  | LogResponse;
