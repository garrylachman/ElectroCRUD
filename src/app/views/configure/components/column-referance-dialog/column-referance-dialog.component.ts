import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IViewColumn, IView } from '../../../../../shared/interfaces/views.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewsIPCService } from '../../../../services/ipc/views.ipc.service';
import { IIPCListOfTablesResponseMessage, IIPCTableInfoResponseMessage, IIPCTableInfoColumn } from '../../../../../shared/ipc/views.ipc';

@Component({
  selector: 'app-column-referance-dialog',
  templateUrl: './column-referance-dialog.component.html',
  styleUrls: ['./column-referance-dialog.component.scss']
})
export class ColumnReferanceDialogComponent implements OnInit  {

  title: string = "Column Referance";

  isSaveEnabled: boolean = false;
  view: IView;
  viewColumn: IViewColumn;
  formGroup: FormGroup;
  tables: string[] = [];
  columns: IIPCTableInfoColumn[] = [];

  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder,
    private viewsIPCService: ViewsIPCService
  ) { 
    
  }

  async ngOnInit() {
    if (this.ref.componentRef.instance.row) {
      this.viewColumn = {...this.ref.componentRef.instance.row} as IViewColumn;
      this.view = {...this.ref.componentRef.instance.view} as IView;
    } else {
      return;
    }

    console.log(this.viewColumn);

    if (!this.viewColumn.ref) {
      this.viewColumn.ref = {};
    }

    this.formGroup = this.fb.group({
      tableCtrl: [this.viewColumn.ref.table, Validators.required],
      matchColumnCtrl: [this.viewColumn.ref.match_column, Validators.required],
      nameCtrl: [this.viewColumn.ref.name, Validators.required]
    });


    await this.loadTablesList();
    await this.loadTableColumns();

    

    this.formGroup.controls['tableCtrl'].valueChanges.subscribe((val) => {
      if (this.viewColumn.ref.table == val) {
        return;
      }
      this.viewColumn.ref.table = val;
      this.viewColumn.ref.match_column = null;
      this.viewColumn.ref.name = null;
      this.loadTableColumns();
    })

    await new Promise(r => setTimeout(r, 500));

    this.formGroup.controls.tableCtrl.setValue(this.viewColumn.ref.table);
    this.formGroup.controls.matchColumnCtrl.setValue(this.viewColumn.ref.match_column);
    this.formGroup.controls.nameCtrl.setValue(this.viewColumn.ref.name);

  }

  public async loadTablesList() {
    let res:IIPCListOfTablesResponseMessage = await this.viewsIPCService.listOfTables();
    if (res.valid) {
      this.tables = [...res.tables].filter(tbl => tbl != this.view.table);
    }
  }

  public async loadTableColumns() {
    if (!this.viewColumn.ref.table) {
      return;
    }
    let resColumns:IIPCTableInfoResponseMessage = await this.viewsIPCService.tableInfo(this.viewColumn.ref.table);

    this.columns = [...resColumns.columns];    

    await new Promise(r => setTimeout(r, 500));
    this.formGroup.controls.matchColumnCtrl.setValue(this.viewColumn.ref.match_column);
    this.formGroup.controls.nameCtrl.setValue(this.viewColumn.ref.name);
  }

  save() {
    this.viewColumn.ref.table = this.formGroup.controls.tableCtrl.value;
    this.viewColumn.ref.name = this.formGroup.controls.nameCtrl.value;
    this.viewColumn.ref.match_column = this.formGroup.controls.matchColumnCtrl.value;
    this.ref.close(this.viewColumn.ref);
  }

}
