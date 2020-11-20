import { JsonValue } from "type-fest";

export class IPCBaseMessage<T> {

    message: T;

    constructor(data: T | JsonValue) {
        this.message =  data as T;
    }

    public toMessage(): T {
        return this.message;
    }

    public toJsonValue(): JsonValue {
        return this.message as any as JsonValue;
    }

}

export interface IExportIPC<T1, T2> {
    channel: string,
    request: IPCBaseMessage<T1>,
    response: IPCBaseMessage<T2>
}