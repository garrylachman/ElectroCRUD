import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { QueriesService } from '../../services/store/queries.service';
import { IQuery } from '../../../shared/interfaces/queries.interface';
import { NbLayoutComponent } from '@nebular/theme';
import { QueriesIPCService } from '../../services/ipc/queries.ipc.service';

import { Spreadsheet } from 'dhx-spreadsheet';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit, OnDestroy {

  @ViewChild(NbLayoutComponent) layout: NbLayoutComponent;

  @ViewChild('spreadsheet', {static: true}) container: ElementRef;
  spreadsheet: Spreadsheet;

  editorOptions = {theme: 'vs-dark', language: 'sql', minimap: { enabled: false }};
  code: string = 'SELECT * FROM';

  queries: IQuery[];

  constructor(
    private sessionsService: SessionService,
    private queriesService: QueriesService,
    private queriesIPCService: QueriesIPCService
  ) { }

  ngOnInit() {

    this.spreadsheet = new Spreadsheet(this.container.nativeElement, {
      toolbar: false,
      menu: false,
      editLine: false,
    });

    this.queries = this.queriesService.all();
    

    this.queriesService.changes.subscribe((items: IQuery[]) => {
      this.queries = items;
    })

    if (this.queries.length == 0) {
      this.addNewTab();
    }
  }

  ngOnDestroy() {
    this.spreadsheet.destructor();
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
    if (res.valid && res.data) {
      const cols = Object.keys([...res.data][0]);
      const data = [...res.data].map(val => Object.values(val));
      this.spreadsheet.parse(this.data2excel_format([[...cols], ...data]));
    }
  }

  private data2excel_format(data: any[]) {
    const ABC: string[] = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
      "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ"
    ];
    let res: any[] = [];

    data.forEach((row, rowIdx) => {
      return row.forEach((col, colIdx) => {
        res.push({
          cell: `${ABC[colIdx]}${rowIdx+1}`,
          value: col
        })
      })
    });

    return res;

  }

}
