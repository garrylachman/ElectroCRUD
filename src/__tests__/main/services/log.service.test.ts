/**
 * @jest-environment node
 */
/* eslint-disable jest/no-conditional-expect */

import { ipcRenderer } from 'electron';
import { LogService } from 'main/services/log.service';
import 'reflect-metadata';
import { LogItem, LogResponse } from 'shared/defenitions';
import { IPCChannelEnum, LogItemTypeEnum } from 'shared/enums';
import { container } from 'tsyringe';

const log = container.resolve(LogService);

describe('Log Service', () => {
  test.each([
    { type: LogItemTypeEnum.ERROR, message: 'error m' },
    { type: LogItemTypeEnum.INFO, message: 'info m' },
    { type: LogItemTypeEnum.WARNING, message: 'warning m' },
    { type: LogItemTypeEnum.SUCCESS, message: 'success m' },
  ])('logging $type', async ({ type, message }) => {
    const res: LogResponse = await new Promise((resolve) => {
      ipcRenderer.once(
        IPCChannelEnum.LOG_CHANNEL,
        (event, response: LogResponse) => {
          resolve(response);
        }
      );
      log[type](message);
    });
    expect(res.channel).toEqual(IPCChannelEnum.LOG_CHANNEL);
    expect(res.body.type).toEqual(type);
    expect(res.body.message).toEqual(message);
    expect(res.body.method).toBeUndefined();
  });

  test.each([
    { type: LogItemTypeEnum.ERROR, message: 'error m', method: 'get' },
    { type: LogItemTypeEnum.INFO, message: 'info m', method: 'set' },
    { type: LogItemTypeEnum.WARNING, message: 'warning m', method: 'get' },
    { type: LogItemTypeEnum.SUCCESS, message: 'success m', method: 'set' },
  ])('logging $type with method $method', async ({ type, message, method }) => {
    const res: LogResponse = await new Promise((resolve) => {
      ipcRenderer.once(
        IPCChannelEnum.LOG_CHANNEL,
        (event, response: LogResponse) => {
          resolve(response);
        }
      );
      log[type](message, method);
    });
    expect(res.channel).toEqual(IPCChannelEnum.LOG_CHANNEL);
    expect(res.body.type).toEqual(type);
    expect(res.body.message).toEqual(message);
    expect(res.body.method).toEqual(method);
  });
});
