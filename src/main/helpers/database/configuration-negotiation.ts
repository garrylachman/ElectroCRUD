import _ from 'lodash';
import { has } from 'underscore';
import { O } from 'ts-toolbelt';
import {
  ConnectionConfig,
  ServerConnectionConfig,
  ServerType,
  ServerTypeEnum,
} from '@electrocrud/shared';

export const configurationNegotiation = (
  client: ServerType,
  config: ConnectionConfig
) => {
  if (has(config, 'port')) {
    _.set(config, 'port', Number((config as ServerConnectionConfig).port));
  }
  if (client === ServerTypeEnum.MSSQL) {
    return _.transform(
      config,
      (result, value, key) => {
        // @ts-ignore
        const configKey: O.Keys<ConnectionConfig> =
          key === 'host' ? 'server' : key;
        return {
          ...result,
          [configKey]: value,
        };
      },
      {}
    ) as ConnectionConfig;
  }
  return config;
};
