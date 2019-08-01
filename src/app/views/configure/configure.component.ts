import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { IView, IViewColumn } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import {
  NbSpinnerService, NbToastrService, NbDialogService
} from '@nebular/theme';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewsIPCService } from '../../services/ipc/views.ipc.service';
import { IPCListOfTablesResponseMessage, IIPCListOfTablesResponseMessage, IIPCTableInfoResponseMessage, IIPCTableInfoColumn } from '../../../shared/ipc/views.ipc';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnReferanceDialogComponent } from './components/column-referance-dialog/column-referance-dialog.component';

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
  subviewForm: FormGroup;

  isSaveEnabled:boolean = false;
  isHavePrimaryKey: boolean = false;
  allViews: IView[] = [];
  subviewTargetView: IView;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
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
        columns: [],
      };
    }

    // load all view to display in subviews form
    this.allViews = this.viewsService.all(this.sessionsService.activeAccount);

    // init empty subview if no value
    if (!this.view.subview) {
      this.view.subview = {
        enabled: false,
      }
    } else {
      // init subviewTargetView if we have already subview (edit mode)
      if (this.view.subview.view_id)  {
        // load the target view to subviewTargetView
        this.subviewTargetView = this.viewsService.get(this.view.subview.view_id);
      }
    }

    this.viewHeaderForm = this.fb.group({
      viewtNameCtrl: [this.view.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      viewtTableCtrl: [this.view.table || null, Validators.required]
    });

    this.termForm = this.fb.group({
      termOneCtrl: [this.view.terms.one, Validators.compose([Validators.required, Validators.minLength(1)])],
      termManyCtrl: [this.view.terms.many, Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.subviewForm = this.fb.group({
      subviewEnabledCtrl: [this.view.subview.enabled, Validators.nullValidator],
      subviewViewIdCtrl: [this.view.subview.view_id || null, Validators.nullValidator],
      subviewSourceColumnCtrl: [this.view.subview.ref ? this.view.subview.ref.source_column : null, Validators.nullValidator],
      subviewTargetColumnCtrl: [this.view.subview.ref ? this.view.subview.ref.target_column : null, Validators.nullValidator],
    });

    this.subviewForm.controls['subviewEnabledCtrl'].valueChanges.subscribe(value => {
      // Enable/Disable subview form
      this.view.subview.enabled = value;

      // Change validators on subview enable/disable change
      const newValidator = value ? Validators.required : Validators.nullValidator;
      this.subviewForm.controls['subviewViewIdCtrl'].setValidators([newValidator]);
      this.subviewForm.controls['subviewSourceColumnCtrl'].setValidators([newValidator]);
      this.subviewForm.controls['subviewTargetColumnCtrl'].setValidators([newValidator]);

      this.subviewForm.controls['subviewViewIdCtrl'].updateValueAndValidity();
      this.subviewForm.controls['subviewSourceColumnCtrl'].updateValueAndValidity();
      this.subviewForm.controls['subviewTargetColumnCtrl'].updateValueAndValidity();

      this.checkForm()
    });

    this.subviewForm.controls['subviewViewIdCtrl'].valueChanges.subscribe(value => {
      // set target view id in subview.view_id
      this.view.subview.view_id = value;

      if (this.view.subview.view_id)  {
        // load the target view to subviewTargetView
        this.subviewTargetView = this.viewsService.get(value);
      }
    });

    this.viewHeaderForm.controls['viewtTableCtrl'].valueChanges.subscribe(value => this.selectedChange(value));
    this.viewHeaderForm.valueChanges.subscribe((v) => this.checkForm());
    this.subviewForm.valueChanges.subscribe((v) => this.checkForm());

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
        info: this.getTagsForRow({
          ...col,
          ...localCol[0] || {}
        }),
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
    this.isSaveEnabled = this.viewHeaderForm.valid && this.termForm.valid && this.subviewForm.valid
  }

  save() {
    if (this.viewHeaderForm.valid && this.termForm.valid && this.subviewForm.valid) {
      this.view.name = this.viewHeaderForm.value.viewtNameCtrl;
      this.view.terms.one = this.termForm.value.termOneCtrl;
      this.view.terms.many = this.termForm.value.termManyCtrl;
      this.view.columns = [...this.rows] as IViewColumn[];

      if (this.subviewForm.value.subviewEnabledCtrl) {
        this.view.subview.enabled = this.subviewForm.value.subviewEnabledCtrl;
        this.view.subview.view_id = this.subviewForm.value.subviewViewIdCtrl;
        this.view.subview.ref = {
          source_column: this.subviewForm.value.subviewSourceColumnCtrl,
          target_column: this.subviewForm.value.subviewTargetColumnCtrl
        };
      }

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

  addEditReferance(row: IViewColumn) {
    console.log("addEditReferance", row)
    this.dialogService
      .open<any>(ColumnReferanceDialogComponent, { 
        hasBackdrop: true,
        context: {
          row: row
        }
      })
      .onClose
      .subscribe((res) => {
        console.log("res", res);
        if (res) {
          row.ref = res;
        }
      });
  }

  deleteReferance(event, row: IViewColumn) {
    event.stopImmediatePropagation();
    row.ref = null;
  }

  getTagsForRow(row: IViewColumn): string[] {
    let tags: string[] = [];
    if (row.type) {
      if (row.length) {
        tags.push(`${row.type}(${row.length})`);
      } else {
        tags.push(`${row.type}`);
      }
    }
    if (row.nullable) {
      tags.push("Nullable");
    }
    if (row.key) {
      tags.push(row.key);
    }
    if (row.extra) {
      tags.push(row.extra);
    }
    return tags;
  }

}
