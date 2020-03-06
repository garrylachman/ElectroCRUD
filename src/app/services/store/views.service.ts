import { Injectable } from '@angular/core';
import { IView } from './../../../shared/interfaces/views.interface';
import { ViewsStore } from '../../../shared/store/views.store';
import { BaseService } from './base.service';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class ViewsService extends BaseService<IView, ViewsStore> {

  constructor(protected sessionService: SessionService) {
    super(
      new ViewsStore(), 
      sessionService
    );
  }
}