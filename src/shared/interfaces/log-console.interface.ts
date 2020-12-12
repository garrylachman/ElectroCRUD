export enum ConsoleLogItemType {
    error,
    warning,
    success,
    info
}

export interface ConsoleLogItem {
    type: ConsoleLogItemType,
    message: string
}

export enum ConsoleLogItemSource {
    UI,
    Backend
}