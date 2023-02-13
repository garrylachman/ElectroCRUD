import { TablesListRequest, TablesListResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCTablesList = (request: TablesListRequest) => {
  return useBaseRequest<TablesListResponse>(request);
};
