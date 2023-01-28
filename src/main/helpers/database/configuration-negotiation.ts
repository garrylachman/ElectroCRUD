import { has, set, transform } from 'lodash';
import {
  ConnectionConfig,
  ServerConnectionConfig,
  ServerType,
  ServerTypeEnum,
} from '../../../shared';

export const configurationNegotiation = (
  client: ServerType,
  config: ConnectionConfig
): ConnectionConfig => {
  if (has(config, 'port')) {
    set(config, 'port', Number(config.port));
  }
  if (client === ServerTypeEnum.MSSQL) {
    return transform<ServerConnectionConfig, ConnectionConfig>(
      config as ServerConnectionConfig,
      (result, value, key) => {
        return (result[key === 'host' ? 'server' : key] = value);
      },
      {}
    );
  }
  return config;
};
