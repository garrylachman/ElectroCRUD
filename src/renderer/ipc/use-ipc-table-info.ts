import { TableInfoRequest, TableInfoResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCTableInfo = (request: TableInfoRequest) => {
  return useBaseRequest<TableInfoResponse>(request);
};
