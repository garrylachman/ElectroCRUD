import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ISubView, IView } from '../../../../../../shared/interfaces/views.interface';
import { ViewsIPCService } from '../../../../../services/ipc/views.ipc.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ViewsService } from '../../../../../services/store/views.service';
import { IPCReadData } from '../../../../../../shared/ipc/views.ipc';

@Component({
  selector: 'app-sub-view',
  templateUrl: './sub-view.component.html',
  styleUrls: ['./sub-view.component.scss']
})
export class SubViewComponent implements OnInit {

  @ViewChild(DatatableComponent) subTable: DatatableComponent;

  @Input() subview:ISubView;
  @Input() row:Object;

  view:IView;
  isLoading: boolean = false;
  totalElements:number = 0;
  offset: number = 0;
  limit: number = 10;

  rows = [];
  columns = [];


  constructor(
    private viewsIPCService: ViewsIPCService,
    private viewsService: ViewsService
  ) { }

  ngOnInit() {
    console.log("this.subview", this.subview);
    if (this.subview.view_id)  {
      // load the target view to subviewTargetView
      this.view = this.viewsService.get(this.subview.view_id);
    }
    console.log("this.view", this.view);
    this.reload();
  }

  async reload() {
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns.filter(col => col.enabled).map(col => col.name), 
        this.limit, 
        this.offset,
        null,
        null,
        [
          {
            column: this.subview.ref.target_column,
            opr: IPCReadData.IIPCReadDataWhereOpr.EQ,
            value: this.row[this.subview.ref.source_column],
            or: false
          }
        ]
        );
    this.totalElements = data.count;
    let columns = data.data.length > 0 ? Object.keys([...data.data].shift()).map(val => ({ name: val, prop: val })) : [];
    console.log("columns", columns)
    this.columns = [
      ...columns
    ];
    this.rows = [...data.data];
    console.log("rows", this.rows)
    console.log(data);
  }

  async setPage(pageInfo){
    console.log("pageInfo:", pageInfo);
    this.offset = pageInfo.offset;
    let sqlOffset = this.offset * pageInfo.pageSize;
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns.map(col => col.name), 
        this.limit, 
        sqlOffset,
        null,
        null,
        [
          {
            column: this.subview.ref.target_column,
            opr: IPCReadData.IIPCReadDataWhereOpr.EQ,
            value: this.row[this.subview.ref.source_column],
            or: false
          }
        ]
      );
    this.rows = [...data.data];
  }

}
