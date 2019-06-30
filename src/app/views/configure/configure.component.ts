import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { IView, IViewColumn } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import {
  NbSpinnerService
} from '@nebular/theme';
import { NgModel } from '@angular/forms';
import { ViewsIPCService } from '../../services/ipc/views.ipc.service';
import { IPCListOfTablesResponseMessage, IIPCListOfTablesResponseMessage, IIPCTableInfoResponseMessage, IIPCTableInfoColumn } from '../../../shared/ipc/views.ipc';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  view: IView;
  isLoading: boolean = false;
  title: string;

  // tables
  selectedTableModel:NgModel;
  tables: string[];

  rows = [];
  temp = [];

  columns = [
    { prop: 'name' },
    { name: 'Enabled' },
    { name: 'Searchable' },
    { name: 'Type' },
    { name: 'Nullable' },
    { name: 'Default' },
    { name: 'Key' },
    { name: 'Extra' }
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService
  ) { }

  async ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.title = `${this.view.name} View Configure`;
    } else {
      // no id, we are in add mode
      this.title = "Add New View";
      this.view = {
        name: '',
        creation_date: new Date().toISOString(),
        account: this.sessionsService.activeAccount.id
      };
    }
    await this.loadTablesList();
  }

  public async selectedChange() {
    console.log(this.selectedTableModel)
    this.view.table = String(this.selectedTableModel);
    let resColumns:IIPCTableInfoResponseMessage = await this.viewsIPCService.tableInfo(String(this.selectedTableModel));
    this.view.columns = resColumns.columns.map((col:IIPCTableInfoColumn) => {
      return {
        ...col,
        searchable: true,
        enabled: true,
        nullable: Boolean(col.nullable)
      } as IViewColumn
    })
    this.rows = this.view.columns;
  }

  public get isEdit(): boolean {
    return this.view && this.view.id > 0;
  }

  public async loadTablesList() {
    console.log("loadTablesList");
    let res:IIPCListOfTablesResponseMessage = await this.viewsIPCService.listOfTables();
    console.log("loadTablesList: ", res);
    if (res.valid) {
      this.tables = res.tables;
    }
  }



}
