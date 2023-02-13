import { IPCError } from './error.define';
import { IPCChannel } from './ipc.define';
import { LogItem } from './log.define';
import {
  ReadDataResult,
  ReadWidgetDataResult,
  TableInfoRow,
} from './server.define';

export type BaseResponse = {
  channel: IPCChannel;
};

export type ErrorResponse = BaseResponse & {
  error: IPCError;
  body?: never;
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

export type ResponseTypeSuccess =
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

export type ResponseType = ResponseTypeSuccess | ErrorResponse;
export type ResponseOrError<T> = T & Partial<ErrorResponse>;
