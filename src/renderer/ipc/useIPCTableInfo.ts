import { TableInfoRequest, TableInfoResponse } from 'shared';
import { useBaseRequest } from './baseRequest';

export const useIPCTableInfo = (req: TableInfoRequest) => {
  return useBaseRequest<TableInfoResponse>(req);
};
