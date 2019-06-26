import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbSortDirection, NbDialogService  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AccountsService, ServerType } from '../services/store/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('mDateTpl', { static: true }) mDateTpl: TemplateRef<any>;
  @ViewChild('cDateTpl', { static: true }) cDateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl', { static: true }) actionsTpl: TemplateRef<any>;

  rows = [];
  temp = [];

  columns = [];

  constructor(
    private dialogService: NbDialogService,
    private accountsService: AccountsService
  ) {
    this.temp = [...this.rows];
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name' },
      { name: 'Server' },
      { name: 'Created', cellTemplate: this.mDateTpl },
      { name: 'Modified', cellTemplate: this.mDateTpl },
      { cellTemplate: this.actionsTpl }
    ];
    this.loadFromStore();
  }

  loadFromStore() {
    this.rows = this.accountsService
      .all()
      .map((row) => {
        return {
          id: row.id,
          name: row.name,
          server: ServerType[`${row.server.server_type}`],
          created: new Date(row.creation_date),
          modified: new Date(row.modify_date)
        }
      })
    this.temp = [...this.rows];
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
    let account = this.accountsService.get(row.id);
    console.log("account: ", account);
    this.dialogService
      .open<any>(AddEditAccountComponent, { 
        hasBackdrop: true,
        context: {
          account: account
        }
      })
      .onClose.subscribe(res => console.log(res));;
  }

  delete(row) {
    console.log(row);
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true }).onClose.subscribe(res => console.log(res));;
  }

}