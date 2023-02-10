import { UpdateRequest, UpdateResponse } from 'shared/index';
import { useBaseRequest } from './base-request';

export const useIPCUpdateData = (request: UpdateRequest) => {
  return useBaseRequest<UpdateResponse>(request);
};
