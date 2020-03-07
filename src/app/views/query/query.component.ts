import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { QueriesService } from '../../services/store/queries.service';
import { IQuery } from '../../../shared/interfaces/queries.interface';
import { NbLayoutComponent } from '@nebular/theme';
import { HotTableComponent } from '@handsontable/angular';
import { QueriesIPCService } from '../../services/ipc/queries.ipc.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;
  @ViewChild(HotTableComponent, { static: true }) hotData: HotTableComponent;

  editorOptions = {theme: 'vs-dark', language: 'sql', minimap: { enabled: false }};
  code: string = 'SELECT * FROM';

  queries: IQuery[];

  data: any[] = [];
  cols: any[] = [];

  constructor(
    private sessionsService: SessionService,
    private queriesService: QueriesService,
    private queriesIPCService: QueriesIPCService
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

  addNewTab() {
    this.queriesService.add({
      name: `Query #${this.queriesService.lastId()}`,
      account: this.sessionsService.activeAccount.id,
      query: 'SELECT'
    })
  }

  closeTab(query: IQuery) {
    this.queriesService.delete(query.id);
  }

  saveTab(query: IQuery) {
    this.queriesService.update(query);
  }

  async execute(query: IQuery) {
    const res = await this.queriesIPCService.executeQuery(query.query);
    console.log(res);
    if (res.valid && res.data) {
      this.cols = Object.keys([...res.data][0]);
      const data = [...res.data].map(val => Object.values(val));
      console.log(data);
      this.data = [...res.data];
      console.log(this.data);
    }
    
  }

}
