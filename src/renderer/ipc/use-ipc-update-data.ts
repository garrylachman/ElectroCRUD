import { UpdateRequest, UpdateResponse } from 'shared';
import { useBaseRequest } from './base-request';

export const useIPCUpdateData = (request: UpdateRequest) => {
  return useBaseRequest<UpdateResponse>(request);
};
