import { IPCChannelEnum } from "../enums";

export type IPCChannel =
  | IPCChannelEnum.CONNECT
  | IPCChannelEnum.LOG_CHANNEL
  | IPCChannelEnum.READ_DATA
  | IPCChannelEnum.TABLES_LIST
  | IPCChannelEnum.TABLE_INFO
  | IPCChannelEnum.DELETE_DATA
  | IPCChannelEnum.INSERT_DATA
  | IPCChannelEnum.UPDATE_DATA
  | IPCChannelEnum.READ_WIDGET_DATA
  | IPCChannelEnum.HEARTBEAT
  | IPCChannelEnum.CHECK_TUNNEL;
