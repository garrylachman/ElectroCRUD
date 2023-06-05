export class NoConnectionError extends Error {
  constructor() {
    super('No connection');
  }
}
