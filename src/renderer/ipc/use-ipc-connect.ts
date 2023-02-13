import { ConnectRequest, ConnectResponse, ErrorResponse } from '@electrocrud/shared';

import { useBaseRequest } from './base-request';

export const useIPCConnect = (request: ConnectRequest) => {
  return useBaseRequest<ConnectResponse | ErrorResponse>(request);
};
