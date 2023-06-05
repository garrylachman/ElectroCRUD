/**
 * @jest-environment node
 */
/* eslint-disable jest/no-conditional-expect */
// @ts-nocheck

import { ipcRenderer } from 'electron';
import LogService from 'main/services/log.service';
import 'reflect-metadata';
import { LogItem, LogResponse } from '@electrocrud/shared';
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
    const response: LogResponse = await new Promise((resolve) => {
      ipcRenderer.once(
        IPCChannelEnum.LOG_CHANNEL,
        (event, result: LogResponse) => {
          resolve(result);
        }
      );
      log[type](message);
    });
    expect(response.channel).toEqual(IPCChannelEnum.LOG_CHANNEL);
    expect(response.body.type).toEqual(type);
    expect(response.body.message).toEqual(message);
    expect(response.body.method).toBeUndefined();
  });

  test.each([
    { type: LogItemTypeEnum.ERROR, message: 'error m', method: 'get' },
    { type: LogItemTypeEnum.INFO, message: 'info m', method: 'set' },
    { type: LogItemTypeEnum.WARNING, message: 'warning m', method: 'get' },
    { type: LogItemTypeEnum.SUCCESS, message: 'success m', method: 'set' },
  ])('logging $type with method $method', async ({ type, message, method }) => {
    const response: LogResponse = await new Promise((resolve) => {
      ipcRenderer.once(
        IPCChannelEnum.LOG_CHANNEL,
        (event, result: LogResponse) => {
          resolve(result);
        }
      );
      log[type](message, method);
    });
    expect(response.channel).toEqual(IPCChannelEnum.LOG_CHANNEL);
    expect(response.body.type).toEqual(type);
    expect(response.body.message).toEqual(message);
    expect(response.body.method).toEqual(method);
  });
});
