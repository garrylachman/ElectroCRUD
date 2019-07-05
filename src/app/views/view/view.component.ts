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

  searchInputModel: NgModel;

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
  }

  clearSearch() {
    // reset search box input
    this.searchInputModel = '' as any;

    // fast way to reload results
    this.selectLimit(this.limit);
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

  get primaryKeyColumn(): string {
    let pri:string = null;
    this.view.columns.forEach(col => {
      if (col.key == "PRI") {
        pri = col.name;
      }
    })
    return pri;
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
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns.map(col => col.name), 
        this.limit, 
        sqlOffset,
        this.view.columns.filter(col => col.searchable).map(col => col.name),
        String(this.searchInputModel).length > 1 ? String(this.searchInputModel)  : null
      );
    this.rows = [...data.data];
  }

  doSearch(event) {
    // if no search input, the user clear the text, reload the result to reset
    if (String(this.searchInputModel).length == 0) return this.selectLimit(this.limit)

    // validate min. of 2 chars
    if (String(this.searchInputModel).length < 2) return;

    // fast way to reload the table
    this.selectLimit(this.limit);
  }

}
