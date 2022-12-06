import { TableInfoRequest, TableInfoResponse } from 'shared';
import { useBaseRequest } from './base-request';

export const useIPCTableInfo = (request: TableInfoRequest) => {
  return useBaseRequest<TableInfoResponse>(request);
};
