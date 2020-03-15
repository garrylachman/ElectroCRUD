import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { reaction, computed, autorun, toJS } from 'mobx';
import * as ElectronStore from  'electron-store';

export const ServerType = {
    '1': 'MySQL',
    '2': 'SQL Server',
    '3': 'Postres'
}
  

export class AccountSSH {
    @observable enabled: boolean = false;
    @observable hostname: string;
    @observable port: number;
    @observable username: string;
    @observable password: string;
    @observable use_key: boolean = false;
    @observable key: string;
}

export class AccountServer {
    @observable server_type: number;
    @observable hostname: string;
    @observable port: number;
    @observable username: string;
    @observable password: string;
    @observable database: string;
}

export class Account {
    @observable id: number;
    @observable name: string;
    @observable creation_date: string = new Date().toISOString();
    @observable modify_date: string = new Date().toISOString();
    @observable server: AccountServer = new AccountServer();
    @observable ssh: AccountSSH = new AccountSSH();

    constructor(id?: number) {
        if (id) {
            this.id = id;
        }
        this.modifyDateReaction();
    }

    private modifyDateReaction() {
        reaction(
            () => this.server||this.ssh||this.name,
            () => {
                this.modify_date = new Date().toISOString();
                console.log("change this.modify_date", this.modify_date);
            }
        )
    }
}

@Injectable()
export class AccountsStoreX {
    @observable accounts: Account[] = [];
    filterDisplayBy: string;

    protected diskStorage: ElectronStore<any>;

    constructor() {
        this.diskStorage = new ElectronStore({
            name: "accounts"
        });
        this.loadFromDisk();
    }

    @action createAccount() {
        const id:number = this.lastId+1;
        this.accounts.push(new Account(id));
        this.saveToDisk()
        return id;
    }

    @action addAccount(account: Account) {
        const id:number = this.lastId+1;
        account.id = id;
        this.accounts.push(account);
        this.saveToDisk()
        return id;
    }

    @action updateAccount(account: Account) {
        this.accounts = this.accounts.map((item: Account) => {
            if (account.id == item.id) {
                return observable(account);
            }
            return item;
        });
        console.log(this.accounts);
        this.saveToDisk()
    }

    @action updateOrAddAccount(account: Account) {
        console.log(account);
        if (account.id) {
            return this.updateAccount(account);
        }
        return this.addAccount(account);
    }

    @computed get validAccounts() {
        return this.accounts.filter(account => account.server);
    }

    @computed get forDisplay() {
        return this.accounts
            .map(account => {
                return {
                    ...account,
                    server: ServerType[`${account.server.server_type}`]
                }
            })
            .filter((account) => account.name.toLowerCase().indexOf(this.filterDisplayBy) !== -1 || !this.filterDisplayBy);
    }

    public setFilterDisplayBy(val: string) {
        this.filterDisplayBy = val;
    }

    public geById(id: number):Account {
        return this.accounts.find(account => account.id === id);
    }

    private loadFromDisk() {
        const initialAccounts = this.diskStorage.get("accounts", []);
        this.accounts = initialAccounts.map(account => {
            const acc:Account = new Account();
            acc.name = account.name;
            acc.id = account.id;
            acc.creation_date = account.creation_date;
            acc.modify_date = account.modify_date;

            if (account.server) {
                acc.server.server_type = account.server.server_type;
                acc.server.hostname = account.server.hostname;
                acc.server.username = account.server.username;
                acc.server.database = account.server.database;
                acc.server.port = account.server.port;
                acc.server.password = account.server.password;
            }

            if (account.ssh) {
                acc.ssh.enabled = account.ssh.enabled;
                acc.ssh.hostname = account.ssh.hostname;
                acc.ssh.password = account.ssh.password;
                acc.ssh.port = account.ssh.port;
                acc.ssh.use_key = account.ssh.use_key;
                acc.ssh.key = account.ssh.key;   
            }   
            console.log(acc);
            return acc;
        });
    }

    public removeAccount(id) {
        this.accounts = this.accounts.filter(account => account.id != id);
        this.saveToDisk();
    }

    private saveToDisk() {
        console.log("saveToDisk", toJS(this.accounts))
        this.diskStorage.set("accounts", toJS(this.accounts));
    }

    private get lastId(): number {
        let lastElem:any = [...this.accounts].pop()
        if (lastElem) {
            return lastElem.id;
        }
        return 1;
    }

}