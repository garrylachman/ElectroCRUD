import { Injectable } from '@angular/core';
import { Account } from './../../../shared/interfaces/accounts.interface';
import { AccountsStore } from './../../../shared/store/accounts-store';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private store: AccountsStore;

  constructor() {
    this.store = new AccountsStore();
   }

  public all(): Account[] {
    return this.store.all();
  }

  public get(id: number): Account {
    return this.store.get(id);
  }

  public add(data: Account): void {
    this.store.add(data);
  }

  public update(data: Account): void {
    this.store.update(data);
  }

  public delete(id: number): void {
    this.store.delete(id);
  }
}

export const ServerType = {
  '1': 'MySQL',
  '2': 'SQL Server'
}