import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IViewColumn } from '../../../../../shared/interfaces/views.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-column-referance-dialog',
  templateUrl: './column-referance-dialog.component.html',
  styleUrls: ['./column-referance-dialog.component.scss']
})
export class ColumnReferanceDialogComponent implements OnInit {

  title: string = "Column Referance";

  isSaveEnabled: boolean = false;
  viewColumn: IViewColumn;
  formGroup: FormGroup;

  constructor(
    public ref: NbDialogRef<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.ref.componentRef.instance.row) {
      this.viewColumn = this.ref.componentRef.instance.row as IViewColumn;
    } else {
      return;
    }

    if (!this.viewColumn.ref) {
      this.viewColumn.ref = {};
    }
    this.formGroup = this.fb.group({
      tableCtrl: [this.viewColumn.ref.name || null, Validators.required],
      matchColumnCtrl: [this.viewColumn.ref.match_column || null, Validators.required],
      nameCtrl: [this.viewColumn.ref.name || null, Validators.required]
    });
  }

  save() {

  }

}
