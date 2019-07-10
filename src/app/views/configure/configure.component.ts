import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { IView, IViewColumn } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import {
  NbSpinnerService, NbToastrService
} from '@nebular/theme';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  viewHeaderForm: FormGroup;
  termForm: FormGroup;

  isSaveEnabled:boolean = false;
  isHavePrimaryKey: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
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
        account: this.sessionsService.activeAccount.id,
        terms: {
          one: '',
          many: ''
        },
        permissions: {
          create: true,
          read: true,
          update: true,
          delete: true
        },
        columns: []
      };
    }

    this.viewHeaderForm = this.fb.group({
      viewtNameCtrl: [this.view.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      viewtTableCtrl: [this.view.table || null, Validators.required]
    });

    this.termForm = this.fb.group({
      termOneCtrl: [this.view.terms.one, Validators.compose([Validators.required, Validators.minLength(1)])],
      termManyCtrl: [this.view.terms.many, Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.viewHeaderForm.controls['viewtTableCtrl'].valueChanges.subscribe(value => this.selectedChange(value));
    this.viewHeaderForm.valueChanges.subscribe((v) => this.checkForm());

    await this.loadTablesList();
  }

  public async selectedChange(newTable) {
    console.log(newTable)
    let isSameTable = (this.view.table == String(newTable));
    this.view.table = String(newTable);
    let resColumns:IIPCTableInfoResponseMessage = await this.viewsIPCService.tableInfo(String(newTable));

    if (!isSameTable) {
      this.view.terms = {
        one: newTable,
        many: `${newTable}s`
      };
    }

    let columnsFromDB = resColumns.columns.map((col:IIPCTableInfoColumn) => {
      let localCol = this.view.columns.filter(fCol => fCol.name == col.name);
      return {
        ...col,
        searchable: true,
        enabled: true,
        nullable: Boolean(col.nullable),
        ...localCol[0] || {}
      } as IViewColumn
    });
    this.view.columns = [...columnsFromDB];

    this.rows = this.view.columns;
    this.termForm.controls.termOneCtrl.setValue(this.view.terms.one);
    this.termForm.controls.termManyCtrl.setValue(this.view.terms.many);
    this.isHavePrimaryKey = this.isContainsPrimaryKey;
    this.view.permissions.delete = this.isHavePrimaryKey;
    this.view.permissions.update = this.isHavePrimaryKey;
  }

  private get isContainsPrimaryKey(): boolean {
    let isPK: boolean = false;
    this.rows.forEach((col: IViewColumn) => {
      if (col.key == "PRI") isPK = true;
    })
    return isPK;
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
    if (this.view.table) {
      this.viewHeaderForm.controls.viewtTableCtrl.setValue(this.view.table);
    }
  }

  checkForm() {
    this.isSaveEnabled = this.viewHeaderForm.valid && this.termForm.valid;
  }

  save() {
    if (this.viewHeaderForm.valid && this.termForm.valid) {
      this.view.name = this.viewHeaderForm.value.viewtNameCtrl;
      this.view.terms.one = this.termForm.value.termOneCtrl;
      this.view.terms.many = this.termForm.value.termManyCtrl;
      this.view.columns = [...this.rows] as IViewColumn[];

      let insertedId:number;

      if (this.view.id) {
        this.viewsService.update(this.view);
        insertedId = this.view.id;
      } else {
        this.viewsService.add(this.view);
        insertedId = this.viewsService.lastId();
      }
      this.sessionsService.reloadViews();
      this.router.navigate(['views', insertedId, 'view']);
    } else {
      this.toastrService.danger("Some details are missing or invalid, please check again.")
    }
  }

}
