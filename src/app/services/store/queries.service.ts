import { Injectable } from '@angular/core';
import { IQuery } from './../../../shared/interfaces/queries.interface';
import { QueriesStore } from '../../../shared/store/queries.store';
import { BaseService } from './base.service';
import { SessionStore } from '../../store/session.store';

@Injectable({
  providedIn: 'root'
})
export class QueriesService extends BaseService<IQuery, QueriesStore> {

  constructor(protected sessionStore: SessionStore) {
    super(
      new QueriesStore(), 
      sessionStore
    );
  }
}