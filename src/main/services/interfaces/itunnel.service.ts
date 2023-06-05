export type TunnelProxyConfig = {
  localPort: number;
  destHost: string;
  destPort: number;
  id: string | number;
};

export interface ITunnelService {
  init(host: string, port: number, username: string, password?: string): void;

  start(
    destinationHostname: string,
    destinationPort: number
  ): Promise<TunnelProxyConfig | undefined>;

  close(): void;
}
