import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbSortDirection, NbDialogService  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('dateTpl', { static: true }) dateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl', { static: true }) actionsTpl: TemplateRef<any>;

  rows = [
    { id: 1,  name: 'MyDB 1', server: 'MySQL', date: new Date() },
    { id: 2, name: 'MyDB 2', server: 'MySQL', date: new Date() },
    { id: 3, name: 'MyDB 3', server: 'MySQL', date: new Date() },
    { id: 4, name: 'MyDB 1', server: 'MySQL', date: new Date() },
    { id: 5, name: 'MyDB 2', server: 'MySQL', date: new Date() },
    { id: 6, name: 'MyDB 3', server: 'MySQL', date: new Date() },
    { id: 7, name: 'MyDB 1', server: 'MySQL', date: new Date() },
    { id: 8, name: 'MyDB 2', server: 'MySQL', date: new Date() },
    { id: 9, name: 'MyDB 3', server: 'MySQL', date: new Date() },
    { id: 10, name: 'MyDB 1', server: 'MySQL', date: new Date() },
    { id: 11, name: 'MyDB 2', server: 'MySQL', date: new Date() },
    { id: 12, name: 'MyDB 3', server: 'MySQL', date: new Date() }
  ];
  temp = [];

  columns = [];

  constructor(
    private dialogService: NbDialogService
  ) {
    this.temp = [...this.rows];
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name' },
      { name: 'Server' },
      { name: 'Date', cellTemplate: this.dateTpl },
      { cellTemplate: this.actionsTpl }
    ];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  edit(row) {
    console.log(row);
    this.dialogService.open(AddEditAccountComponent, { hasBackdrop: true }).onClose.subscribe(res => console.log(res));;
  }

  delete(row) {
    console.log(row);
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true }).onClose.subscribe(res => console.log(res));;
  }

}