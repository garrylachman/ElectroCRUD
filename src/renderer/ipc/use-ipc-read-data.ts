import { ReadDataRequest, ReadDataResponse } from '@electrocrud/shared';
import { useBaseRequest } from './base-request';

export const useIPCReadData = (request: ReadDataRequest) => {
  return useBaseRequest<ReadDataResponse>(request);
};
