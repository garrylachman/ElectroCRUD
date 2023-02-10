import { ConnectRequest, ConnectResponse, ErrorResponse } from 'shared/index';

import { useBaseRequest } from './base-request';

export const useIPCConnect = (request: ConnectRequest) => {
  return useBaseRequest<ConnectResponse | ErrorResponse>(request);
};
