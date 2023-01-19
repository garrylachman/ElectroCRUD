import { DeleteRequest, DeleteResponse } from 'shared';
import { useBaseRequest } from './base-request';

export const useIPCDeleteData = (request: DeleteRequest) => {
  return useBaseRequest<DeleteResponse>(request);
};
