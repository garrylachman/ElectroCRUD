import { AccountsIPC } from './ipc/accounts.ipc';
import { ViewsIPC } from './ipc/views.ipc';
import { QueriesIPC } from './ipc/queries.ipc';

export class BackendMain {

    private accountsIPC: AccountsIPC
    private viewsIPC: ViewsIPC;
    private queriesIPC: QueriesIPC;

    constructor() {
        this.accountsIPC = new AccountsIPC();
        this.viewsIPC = new ViewsIPC();
        this.queriesIPC = new QueriesIPC();
    }

    public listen():void {
        this.accountsIPC.listen();
        this.viewsIPC.listen();
        this.queriesIPC.listen();
    }

}