import { InsertRequest, InsertResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCInsertData = (request: InsertRequest) => {
  return useBaseRequest<InsertResponse>(request);
};
