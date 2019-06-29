import { BaseStore } from './base-store';
import { Account } from '../interfaces/accounts.interface';

const CONST_NAME = "accounts";

export class AccountsStore extends BaseStore {

    constructor() {
        super(CONST_NAME);
    }

    public all(): Account[] {
        return this._all<Account>();
    }

    public get(id: number): Account {
        let accounts: Account[] = this.all();
        for (let i=0; i <= accounts.length; i++) {
            if (accounts[i].id == id)   {
                return accounts[i];
            }
        }
    }

    public add(data: Account): void {
        data.id = this.lastId<Account>();
        ++data.id; // increment the last id
        let accounts = this.all();
        accounts.push(data);
        this.store.set(CONST_NAME, accounts);
    }

    public update(data: Account): void {
        if (!data.id) {
            throw new Error('Account ID missing');
        }

        // update the modify date
        data.modify_date = new Date().toISOString()

        let accounts = this
            .all()
            .map((account:Account) => {
                if (account.id == data.id) {
                    return data;
                }
                return account;
            });
        this.store.set(CONST_NAME, accounts);
    }

    public delete(id: number): void {
        let accounts = this
            .all()
            .filter((account:Account) => account.id != id);
        this.store.set(CONST_NAME, accounts);
    }
}