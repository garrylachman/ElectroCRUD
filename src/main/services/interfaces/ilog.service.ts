import { LogItemTypeEnum, LogItemType } from '@electrocrud/shared';

export interface ILogService {
  [LogItemTypeEnum.ERROR](message: string, method?: string): void;
  [LogItemTypeEnum.INFO](message: string, method?: string): void;
  [LogItemTypeEnum.SUCCESS](message: string, method?: string): void;
  [LogItemTypeEnum.WARNING](message: string, method?: string): void;
  addItem(type: LogItemType, message: string, method?: string): void;
}
