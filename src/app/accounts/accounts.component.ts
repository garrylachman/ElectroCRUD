import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbSortDirection, NbDialogService, NbToastrService  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AccountsService, ServerType } from '../services/store/accounts.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { SessionService } from '../services/session.service';
import { IIPCConnectResponseMessage } from '../../shared/ipc/accounts.ipc';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  isLoading: boolean = false;
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
    private accountsService: AccountsService,
    private sessionService: SessionService,
    private toastrService: NbToastrService
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
    let account:IAccount;
    if (row && row.id)  {
      account = this.accountsService.get(row.id);
    }
    this.dialogService
      .open<any>(AddEditAccountComponent, { 
        hasBackdrop: true,
        context: {
          account: account
        }
      })
      .onClose
      .subscribe((res) => {
        if (res) {
          if (!(res as IAccount).id) {
            this.accountsService.add(res);
          } else {
            this.accountsService.update(res);
          }
          this.loadFromStore();
        }
      });
  }

  delete(row) {
    this.dialogService
      .open(ConfirmDeleteComponent, { hasBackdrop: true })
      .onClose
      .subscribe((res) => {
        this.accountsService.delete(row.id);
        this.loadFromStore();
      });
  }

  async use(row) {
    this.isLoading = true;
    let account:IAccount = this.accountsService.get(row.id);
    let res:IIPCConnectResponseMessage = await this.sessionService.setActiveAccount(account);
    console.log("connect response: ", row);
    this.isLoading = false;
    if (!res.valid) {
      this.toastrService.show(status, res.error, { status: "danger" });
    } else {
      this.toastrService.show(status, `Connected to ${account.name}.`, { status: "success" });
    }
  }

}