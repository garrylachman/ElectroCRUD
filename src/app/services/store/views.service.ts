import { Injectable } from '@angular/core';
import { IAccount } from './../../../shared/interfaces/accounts.interface';
import { IView } from './../../../shared/interfaces/views.interface';
import { ViewsStore } from '../../../shared/store/views.store';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  private store: ViewsStore;

  constructor() {
    this.store = new ViewsStore();
   }

  public all(account: IAccount): IView[] {
    return this.store.all(account);
  }

  public get(id: number): IView {
    return this.store.get(id);
  }

  public add(data: IView): void {
    this.store.add(data);
  }

  public update(data: IView): void {
    this.store.update(data);
  }

  public delete(id: number): void {
    this.store.delete(id);
  }
}