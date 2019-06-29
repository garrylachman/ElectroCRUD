import { Injectable } from '@angular/core';
import { Account } from '../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _activeAccount:Account;

  constructor() { }

  public set activeAccount(account: Account) {
    this._activeAccount = account;
  }

  public get activeAccount(): Account {
    return this._activeAccount;
  }
}
