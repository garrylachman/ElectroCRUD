import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IView } from '../../../shared/interfaces/views.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ViewsService } from '../../services/store/views.service';
import { ViewsIPCService } from '../../services/ipc/views.ipc.service';
import { NgModel } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  view: IView;
  isLoading: boolean = false;
  title: string;

  rows = [];
  columns = [];

  totalElements:number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadView();
    })
    /*this.limitModel.valueChanges.subscribe((value) => {
      console.log("value", value);
    })*/
  }

  selectLimit(value) {
    this.limit = value;
    this.offset = 0;
    this.setPage({
      offset: this.offset,
      limit: this.limit,
      pageSize: this.limit
    })
  }

  async loadView() {
    if (this.route.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.title = this.view.name;
    }
    await this.reload();
  }

  async reload() {
    let data = await this.viewsIPCService.readData(this.view.table, this.view.columns.filter(col => col.enabled).map(col => col.name), this.limit, this.offset);
    this.totalElements = data.count;
    let columns = data.data.length > 0 ? Object.keys([...data.data].shift()).map(val => ({ name: val, prop: val })) : [];
    console.log("columns", columns)
    this.columns = [...columns];
    this.rows = [...data.data];
    console.log("rows", this.rows)
    console.log(data);
  }

  async pageReload() {
    
  }

  async setPage(pageInfo){
    console.log("pageInfo:", pageInfo);
    this.offset = pageInfo.offset;
    let sqlOffset = this.offset * pageInfo.pageSize;
    let data = await this.viewsIPCService.readData(this.view.table, this.view.columns.map(col => col.name), this.limit, sqlOffset);
    this.rows = [...data.data];
  }

}
