import 'reflect-metadata';
import _ from 'lodash';
import { autoInjectable, inject, singleton } from 'tsyringe';
import { SshTunnel, SshConfig } from 'ssh-tunneling';
import getPort from 'get-port';
import getCurrentLine from 'get-current-line';
import {
  ITunnelService,
  TunnelProxyConfig,
} from './interfaces/itunnel.service';
import { ILogService } from './interfaces/ilog.service';

@singleton()
@autoInjectable()
export default class TunnelService implements ITunnelService {
  private client?: SshTunnel;

  // eslint-disable-next-line no-useless-constructor
  constructor(@inject('ILogService') private logService: ILogService) {}

  public init(
    host: string,
    port: number,
    username: string,
    password?: string
  ): void {
    const config: SshConfig = {
      host,
      port,
      username,
      password,
    };
    this.client = new SshTunnel(config);
    this.logService.info(
      `Init Tunnel: ${JSON.stringify(_.omit(config, ['password']))}`,
      getCurrentLine().method
    );
  }

  public async start(
    destinationHostname: string,
    destinationPort: number
  ): Promise<TunnelProxyConfig | any> {
    const lPort = await getPort({ port: getPort.makeRange(3000, 10_000) });
    this.logService.info(
      `Start Tunnel: ${lPort}:${destinationHostname}:${destinationPort}`,
      getCurrentLine().method
    );
    return this.client?.forwardOut(
      `${lPort}:${destinationHostname}:${destinationPort}`
    );
  }

  public async close() {
    this.logService.info(`Close Tunnel`, getCurrentLine().method);
    await this.client?.close();
  }
}
