import { BaseStore } from './base.store';
import { IAccount } from '../interfaces/accounts.interface';

const CONST_NAME = "accounts";

export class AccountsStore extends BaseStore {

    constructor() {
        super(CONST_NAME);
    }

    public all(): IAccount[] {
        return this._all<IAccount>();
    }

    public get(id: number): IAccount {
        let accounts: IAccount[] = this.all();
        for (let i=0; i <= accounts.length; i++) {
            if (accounts[i].id == id)   {
                return accounts[i];
            }
        }
    }

    public add(data: IAccount): void {
        data.id = this.lastId<IAccount>();
        ++data.id; // increment the last id
        let accounts = this.all();
        accounts.push(data);
        this.store.set(CONST_NAME, accounts);
    }

    public update(data: IAccount): void {
        if (!data.id) {
            throw new Error('Account ID missing');
        }

        // update the modify date
        data.modify_date = new Date().toISOString()

        let accounts = this
            .all()
            .map((account:IAccount) => {
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
            .filter((account:IAccount) => account.id != id);
        this.store.set(CONST_NAME, accounts);
    }
}