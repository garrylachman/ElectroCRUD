import { Injectable } from '@angular/core';
import { IQuery } from './../../../shared/interfaces/queries.interface';
import { QueriesStore } from '../../../shared/store/queries.store';
import { BaseService } from './base.service';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class QueriesService extends BaseService<IQuery, QueriesStore> {

  constructor(protected sessionService: SessionService) {
    super(
      new QueriesStore(), 
      sessionService
    );
  }
}