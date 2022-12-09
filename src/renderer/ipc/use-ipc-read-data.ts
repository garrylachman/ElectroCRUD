import { ReadDataRequest, ReadDataResponse } from 'shared';
import { useBaseRequest } from './base-request';

export const useIPCReadData = (request: ReadDataRequest) => {
  return useBaseRequest<ReadDataResponse>(request);
};
