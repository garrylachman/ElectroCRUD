import { AccountsIPC } from './ipc/accounts.ipc';

export class BackendMain {

    private accountsIPC: AccountsIPC

    constructor() {
        this.accountsIPC = new AccountsIPC();
    }

    public listen():void {
        this.accountsIPC.listen();
    }

}