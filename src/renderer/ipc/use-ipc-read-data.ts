import { ReadDataRequest, ReadDataResponse } from 'shared/index';
import { useBaseRequest } from './base-request';

export const useIPCReadData = (request: ReadDataRequest) => {
  return useBaseRequest<ReadDataResponse>(request);
};
