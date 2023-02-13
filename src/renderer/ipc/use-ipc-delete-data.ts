import { DeleteRequest, DeleteResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCDeleteData = (request: DeleteRequest) => {
  return useBaseRequest<DeleteResponse>(request);
};
