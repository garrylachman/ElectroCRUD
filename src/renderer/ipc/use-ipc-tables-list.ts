import { TablesListRequest, TablesListResponse } from 'shared';
import { useBaseRequest } from './base-request';

export const useIPCTablesList = (request: TablesListRequest) => {
  return useBaseRequest<TablesListResponse>(request);
};
