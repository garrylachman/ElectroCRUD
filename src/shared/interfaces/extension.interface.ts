export interface IExtensionPackage {
    name: string,
    version: string,
    description: string,
    author: string,
    license?: string,
    content: IExtensionContent,
    localPath?: string,
}

export interface IExtensionContent {
    scripts: {
        view?: IExtensionContentScriptView[],
        backend?: IExtensionContentScriptBackend[]
    }
}

export interface IExtensionContentScript {
    name: string,
    main: string
}

export interface IExtensionContentScriptView extends IExtensionContentScript {
    displayName: string
}

export interface IExtensionContentScriptBackend extends IExtensionContentScript {

}