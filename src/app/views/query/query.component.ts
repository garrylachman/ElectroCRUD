import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { QueriesService } from '../../services/store/queries.service';
import { IQuery } from '../../../shared/interfaces/queries.interface';
import { NbLayoutComponent } from '@nebular/theme';
import { HotTableComponent } from '@handsontable/angular';

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

  data: any[] = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', '', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', '', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', '', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', '', 'Tesla', 'Mercedes', 'Toyota', 'Volvo', '', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
    ['2019', 10, 11, 12, 13, '2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ];

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

}
