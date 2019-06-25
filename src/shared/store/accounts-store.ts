import { BaseStore } from './base-store';
import { AccountsSchema } from './schema/accounts.schema';
import { Account } from '../interfaces/accounts.interface';

const CONST_NAME = "accounts";

export class AccountsStore extends BaseStore {

    constructor() {
        super(CONST_NAME, AccountsSchema);
    }

    all(): Account[] {
        return this.store.get('accounts', []) as Account[];
    }

    add(data: Account) {
        let accounts = this.all().push(data);
        this.store.set('accounts', accounts);
    }
}