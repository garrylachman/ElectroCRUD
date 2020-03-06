import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { QueriesService } from '../../services/store/queries.service';
import { IQuery } from '../../../shared/interfaces/queries.interface';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'sql', minimap: { enabled: false }};
  code: string = 'SELECT * FROM';

  queries: IQuery[];

  constructor(
    private sessionsService: SessionService,
    private queriesService: QueriesService,
  ) { }

  ngOnInit() {
    this.queries = this.queriesService.all();

    this.queriesService.changes.subscribe((items: IQuery[]) => {
      console.log(items)
      this.queries = items;
    })

    /*this.queriesService.add({
      name: 'tab 1',
      account: this.sessionsService.activeAccount.id,
      query: 'SELECT'
    })*/
  }

}
