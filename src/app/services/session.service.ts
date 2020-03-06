import { Injectable } from '@angular/core';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { AccountsService } from './store/accounts.service';
import { IView } from '../../shared/interfaces/views.interface';
import { AccountsIPCService } from './ipc/accounts.service';
import { IIPCConnectResponseMessage } from '../../shared/ipc/accounts.ipc';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _activeAccount:IAccount;
  public changes:BehaviorSubject<IAccount> = new BehaviorSubject(this._activeAccount);

  constructor(
    private accountsStore: AccountsService,
    private accountsIPCService: AccountsIPCService
  ) { }

  public async setActiveAccount(account: IAccount): Promise<IIPCConnectResponseMessage> {
    let res: IIPCConnectResponseMessage = await this.accountsIPCService.connect(account);
    if (res.valid) {
      this._activeAccount = account;
      this.changes.next(this._activeAccount);
    }
    return res;
  }

  public get activeAccount(): IAccount {
    return this._activeAccount;
  }

  public get activeAccountFromStore(): IAccount {
    if (!this.activeAccount) {
      return null;
    }
    return this.accountsStore.get(this.activeAccount.id);
  }
}
