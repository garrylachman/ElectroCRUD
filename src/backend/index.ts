import { AccountsIPC } from './ipc/accounts.ipc';
import { ViewsIPC } from './ipc/views.ipc';
import { QueriesIPC } from './ipc/queries.ipc';
import { ExtensionsIPC } from './ipc/extensions.ipc';


import container from "./ioc";

export class BackendMain  {


    private accountsIPC: AccountsIPC
    private viewsIPC: ViewsIPC;
    private queriesIPC: QueriesIPC;
    private extensionsIPC: ExtensionsIPC;

    constructor() { 
        this.accountsIPC = container.get<AccountsIPC>(AccountsIPC);
        this.viewsIPC = container.get<ViewsIPC>(ViewsIPC);
        this.queriesIPC = container.get<QueriesIPC>(QueriesIPC);
        this.extensionsIPC = container.get<ExtensionsIPC>(ExtensionsIPC);
    }

    public listen():void {
        this.accountsIPC.listen();
        this.viewsIPC.listen();
        this.queriesIPC.listen();
        this.extensionsIPC.listen();
    }

}