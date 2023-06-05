// @ts-nocheck
import { NoActiveClientError, NoConnectionError } from 'main/exceptions';

describe('Exceptions', () => {
  test.each([
    { Exception: NoActiveClientError, expected: 'No active client' },
    { Exception: NoConnectionError, expected: 'No connection' },
  ])('Exception $Exception equals $expected', ({ Exception, expected }) => {
    expect(() => {
      throw new Exception();
    }).toThrowError(expected);
    expect(new Exception()).toBeInstanceOf(Error);
  });
});
