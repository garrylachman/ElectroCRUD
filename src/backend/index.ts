import { AccountsIPC } from './ipc/accounts.ipc';
import { ViewsIPC } from './ipc/views.ipc';

export class BackendMain {

    private accountsIPC: AccountsIPC
    private viewsIPC: ViewsIPC;

    constructor() {
        this.accountsIPC = new AccountsIPC();
        this.viewsIPC = new ViewsIPC();
    }

    public listen():void {
        this.accountsIPC.listen();
        this.viewsIPC.listen();
    }

}