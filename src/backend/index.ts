import { AccountsIPC } from './ipc/accounts.ipc';
import { ViewsIPC } from './ipc/views.ipc';
import { QueriesIPC } from './ipc/queries.ipc';

import container from "./ioc";

export class BackendMain  {

    private accountsIPC: AccountsIPC
    private viewsIPC: ViewsIPC;
    private queriesIPC: QueriesIPC;

    constructor() { 
        this.accountsIPC = container.get<AccountsIPC>(AccountsIPC);
        this.viewsIPC = container.get<ViewsIPC>(ViewsIPC);
        this.queriesIPC = container.get<QueriesIPC>(QueriesIPC);
    }

    public listen():void {
        this.accountsIPC.listen();
        this.viewsIPC.listen();
        this.queriesIPC.listen();
    }

}