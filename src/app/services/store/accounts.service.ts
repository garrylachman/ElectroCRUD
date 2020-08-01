import { Injectable } from '@angular/core';
import { IAccount } from './../../../shared/interfaces/accounts.interface';
import { AccountsStore } from '../../../shared/store/accounts.store';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private accountsStore: AccountsStore;

  constructor() {
    this.accountsStore = new AccountsStore();
   }

  public all(): IAccount[] {
    return this.accountsStore.all();
  }

  public get(id: number): IAccount {
    return this.accountsStore.get(id);
  }

  public add(data: IAccount): void {
    this.accountsStore.add(data);
  }

  public update(data: IAccount): void {
    this.accountsStore.update(data);
  }

  public delete(id: number): void {
    this.accountsStore.delete(id);
  }
}

export const ServerType = {
  '1': 'MySQL',
  '2': 'SQL Server',
  '3': 'Postres',
  '5': 'SQLite'
}

export const ServerIcon = {
  '1': 'mysql-dolphin',
  '2': 'windowseight',
  '3': 'pgsql',
  '5': 'database'
}