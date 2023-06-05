import { LogItemSourceEnum, LogItemTypeEnum } from '../enums';

export type LogItemSource = LogItemSourceEnum.Backend | LogItemSourceEnum.UI;

export type LogItemType =
  | LogItemTypeEnum.ERROR
  | LogItemTypeEnum.INFO
  | LogItemTypeEnum.SUCCESS
  | LogItemTypeEnum.WARNING;

type LogItemContent = {
  type: LogItemType;
  source: LogItemSource;
  message: string;
  method?: string;
  ts: number;
  id: string;
  body?: LogItemContent;
};

export type LogItem = LogItemContent;
