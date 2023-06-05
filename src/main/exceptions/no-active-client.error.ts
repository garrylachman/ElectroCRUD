export class NoActiveClientError extends Error {
  constructor() {
    super('No active client');
  }
}
