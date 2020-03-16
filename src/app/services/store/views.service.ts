import { Injectable } from '@angular/core';
import { IView } from './../../../shared/interfaces/views.interface';
import { ViewsStore } from '../../../shared/store/views.store';
import { BaseService } from './base.service';
import { SessionService } from '../session.service';
import { SessionStore } from '../../store/session.store';

@Injectable({
  providedIn: 'root'
})
export class ViewsService extends BaseService<IView, ViewsStore> {

  constructor(protected sessionStore: SessionStore) {
    super(
      new ViewsStore(), 
      sessionStore
    );
  }
}