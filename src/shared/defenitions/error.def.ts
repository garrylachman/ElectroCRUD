export enum ErrorType {
  GENERIC,
  NOT_CONNECTED,
  EXECUTE_ERROR,
}

export type IPCError = {
  type: ErrorType;
  message: string;
};
