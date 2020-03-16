import { observable, action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { reaction, computed, autorun, toJS } from 'mobx';
import { Account, AccountsStoreX } from './accounts.store';

@Injectable()
export class SessionStore {
    @observable activeAccountID: number

    constructor(private accountStore:AccountsStoreX) {
    }

    @computed get activeAccount() {
        return this.accountStore.getById(this.activeAccountID);
    }

    @action setActiveAccount(account: Account) {
        this.activeAccountID = account.id.valueOf();
    }

    @action setActiveAccountID(id: number) {
        this.activeAccountID = id;
    }

}