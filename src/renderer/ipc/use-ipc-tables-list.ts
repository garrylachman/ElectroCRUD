import { TablesListRequest, TablesListResponse } from 'shared/index';
import { useBaseRequest } from './base-request';

export const useIPCTablesList = (request: TablesListRequest) => {
  return useBaseRequest<TablesListResponse>(request);
};
