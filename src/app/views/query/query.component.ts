import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { QueriesService } from '../../services/store/queries.service';
import { IQuery } from '../../../shared/interfaces/queries.interface';
import { NbLayoutComponent } from '@nebular/theme';
import { QueriesIPCService } from '../../services/ipc/queries.ipc.service';

import * as canvasDatagrid from 'canvas-datagrid';
import { SessionStore } from '../../store/session.store';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit, OnDestroy {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  editorOptions = {theme: 'vs-dark', language: 'sql', minimap: { enabled: false }};
  code: string = 'SELECT * FROM';

  queries: IQuery[];

  dataGrid: any;
  hideResults: boolean = true;

  constructor(
    private sessionsStore: SessionStore,
    private queriesService: QueriesService,
    private queriesIPCService: QueriesIPCService
  ) { }

  ngOnInit() {

    this.dataGrid = canvasDatagrid({
      parentNode: document.getElementById('gridctr'),
      data: []
    });

    this.dataGrid.style.width = '100%';

    this.queries = this.queriesService.all();

    this.queriesService.changes.subscribe((items: IQuery[]) => {
      console.log(items)
      this.queries = items;
    })
  }

  ngOnDestroy() {
  }

  addNewTab() {
    this.queriesService.add({
      name: `Query #${this.queriesService.lastId()}`,
      account: this.sessionsStore.activeAccount.id,
      query: 'SELECT'
    })
  }

  closeTab(query: IQuery) {
    this.queriesService.delete(query.id);
  }

  saveTab(query: IQuery) {
    this.queriesService.update(query);
  }

  changeTab(event) {
    if (event.tabTitle == "New Tab") {
      this.addNewTab();
    }
  }

  async execute(query: IQuery) {    
    const res = await this.queriesIPCService.executeQuery(query.query);
    this.hideResults = !res.valid;
    setTimeout(() => {
      if (res.valid && res.data) {
        this.dataGrid.data = [...res.data];
      }
    }, 1000);
  }

}
