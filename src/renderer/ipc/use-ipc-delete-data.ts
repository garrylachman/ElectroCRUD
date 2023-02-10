import { DeleteRequest, DeleteResponse } from 'shared/index';
import { useBaseRequest } from './base-request';

export const useIPCDeleteData = (request: DeleteRequest) => {
  return useBaseRequest<DeleteResponse>(request);
};
