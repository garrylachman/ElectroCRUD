import { inject } from 'tsyringe';
import {
  CheckTunnelRequest,
  ErrorResponse,
  ErrorType,
  IPCError,
  ResponseTypeSuccess,
} from '../../shared';
import { ITunnelService } from '../services/interfaces/itunnel.service';
import { ResponseFactoryType } from '../helpers';

export default class CheckTunnelIPC {
  constructor(@inject('ITunnelService') private tunnel: ITunnelService) {}

  public async createRequest(
    request: CheckTunnelRequest
  ): Promise<ResponseTypeSuccess | ErrorResponse> {
    const { channel, body } = request;
    try {
      this.tunnel.init(body.host, body.port, body.username, body.password);
      const result = await this.tunnel.start(
        body.destinationHostname,
        body.destinationPort
      );
      return ResponseFactoryType(channel, !!result?.id);
    } catch (error) {
      return ResponseFactoryType(channel, {
        type: (error as IPCError).type || ErrorType.GENERIC,
        message: (error as IPCError).message,
      });
    }
  }
}
