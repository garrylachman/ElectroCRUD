import { TablesListRequest, TablesListResponse } from 'shared';
import { useBaseRequest } from './baseRequest';

export const useIPCTablesList = (req: TablesListRequest) => {
  return useBaseRequest<TablesListResponse>(req);
};
