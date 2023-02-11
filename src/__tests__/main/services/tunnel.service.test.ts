/**
 * @jest-environment node
 */
/* eslint-disable jest/no-conditional-expect */
// @ts-nocheck

import 'reflect-metadata';
import { describe, test, expect, jest } from '@jest/globals';
import compose from 'docker-compose';
import { registry, delay, container } from 'tsyringe';
import path from 'node:path';
import { ServerConnectionConfig, ServerTypeEnum } from '@electrocrud/shared';
import DatabaseService from 'main/services/database.service';
import RequestFactory from 'main/ipc/base.ipc';
import LogService from 'main/services/log.service';
import TunnelService from 'main/services/tunnel.service';
import { sleepFor } from '../utils';

jest.setTimeout(60 * 1000);
@registry([
  { token: 'IDatabaseService', useToken: delay(() => DatabaseService) },
  { token: 'IRequestFactory', useToken: delay(() => RequestFactory) },
  {
    token: 'IIPCService',
    useToken: delay(() =>
      jest.fn().mockImplementation(() => {
        return { send: jest.fn() };
      })
    ),
  },
  { token: 'ILogService', useToken: delay(() => LogService) },
  { token: 'ITunnelService', useToken: delay(() => TunnelService) },
])
class ServiceRegistery {}

const srv = new ServiceRegistery();

const tunnel = container.resolve(TunnelService);
const database = container.resolve(DatabaseService);

beforeAll(async () => {
  await compose.down({
    cwd: path.resolve('src/__tests__/data/'),
    config: 'docker-compose.yml',
    log: true,
  });
  await compose.upAll({
    cwd: path.resolve('src/__tests__/data/'),
    config: 'docker-compose.yml',
    log: true,
  });
  await sleepFor(5000);
});

afterAll(async () => {
  await compose.down({
    cwd: path.resolve('src/__tests__/data/'),
    config: 'docker-compose.yml',
    log: true,
  });
  await database.disconnect();
});

describe('Tunnel Service', () => {
  test('connect', async () => {
    tunnel.init('localhost', 222, 'root', 'passwd');
    const forward = await tunnel.start('mariadb', 3306);
    expect(forward).toHaveProperty('destHost', 'mariadb');
    expect(forward).toHaveProperty('destPort', 3306);
    expect(forward).toHaveProperty('localPort');
    expect(forward?.localPort).toBeGreaterThanOrEqual(3000);
    expect(forward?.localPort).toBeLessThanOrEqual(10_000);
    await tunnel.close();
  });

  test('connect to mariadb via tunnel', async () => {
    tunnel.init('localhost', 222, 'root', 'passwd');
    const forward = await tunnel.start('mariadb', 3306);

    const result = await database.connect(ServerTypeEnum.MYSQL, {
      host: 'localhost',
      port: forward?.localPort || 0,
      user: 'example',
      password: 'example',
      database: 'example',
    } as ServerConnectionConfig);

    expect(result).toBeTruthy();

    const tablesList = await database.listTables();

    expect(tablesList).toContain('country_languages');
    expect(tablesList).toContain('region_areas');
    expect(tablesList).toContain('countries');

    await tunnel.close();
  });
});
