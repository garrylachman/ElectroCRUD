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