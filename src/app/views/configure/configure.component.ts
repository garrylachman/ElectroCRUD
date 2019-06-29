import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { IView } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import {
  NbSpinnerService
} from '@nebular/theme';
import { NgModel } from '@angular/forms';
import { ViewsIPCService } from '../../services/ipc/views.ipc.service';
import { IPCListOfTablesResponseMessage, IIPCListOfTablesResponseMessage } from '../../../shared/ipc/views.ipc';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  view: IView;
  isLoading: boolean = false;
  title: string;

  // tables
  selectedTableModel:NgModel;
  tables: string[];


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
    }
    await this.loadTablesList();
  }

  public selectedChange() {
    console.log(this.selectedTableModel)
  }

  public get isEdit(): boolean {
    return this.view && this.view.id > 0;
  }

  public async loadTablesList() {
    console.log("loadTablesList");
    let res:IIPCListOfTablesResponseMessage =  await this.viewsIPCService.listOfTables(this.sessionsService.activeAccount);
    console.log("loadTablesList: ", res);
    if (res.valid) {
      this.tables = res.tables;
    }
  }

}
