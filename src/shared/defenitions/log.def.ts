import { LogItemSourceEnum, LogItemTypeEnum } from 'shared/enums';

export type LogItemSource = LogItemSourceEnum.Backend | LogItemSourceEnum.UI;

export type LogItemType =
  | LogItemTypeEnum.ERROR
  | LogItemTypeEnum.INFO
  | LogItemTypeEnum.SUCCESS
  | LogItemTypeEnum.WARNING;

export type LogItem = {
  type: LogItemType;
  source: LogItemSource;
  message: string;
  method?: string;
};
