import { UpdateRequest, UpdateResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCUpdateData = (request: UpdateRequest) => {
  return useBaseRequest<UpdateResponse>(request);
};
