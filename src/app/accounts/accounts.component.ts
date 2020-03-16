import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbSortDirection, NbDialogService, NbToastrService, NbIconLibraries  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AccountsService, ServerType, ServerIcon } from '../services/store/accounts.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { SessionService } from '../services/session.service';
import { IIPCConnectResponseMessage } from '../../shared/ipc/accounts.ipc';
import { AccountsStoreX, Account } from '../store/accounts.store';
import { observable } from 'mobx-angular';
import { toJS } from 'mobx';
import { AccountsIPCService } from '../services/ipc/accounts.service';
import { SessionStore } from '../store/session.store';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
/**
 * A class representing a AccountsComponent
 */
export class AccountsComponent implements OnInit {

  /**
   * Loading indicator
   */
  isLoading: boolean = false;
  /**
   * Data table loading indicator
   */
  loadingIndicator: boolean = true;
  /**
   * Is data table re-order enabled
   */
  reorderable: boolean = true;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  /**
   * @ViewChild Data table modification date template column.
   */
  @ViewChild('mDateTpl', { static: true }) mDateTpl: TemplateRef<any>;
  /**
   * @ViewChild Data table creation date template column.
   */
  @ViewChild('cDateTpl', { static: true }) cDateTpl: TemplateRef<any>;
  /**
   * @ViewChild Data table actions (buttons) template column.
   */
  @ViewChild('actionsTpl', { static: true }) actionsTpl: TemplateRef<any>;

  /**
   * Data table columns 
   */
  columns = [];

  /**
   * @constructor
   * @param dialogService   NbDialogService dependency injection.
   * @param accountsService AccountsService dependency injection.
   * @param sessionService  SessionService dependency injection.
   * @param toastrService   NbToastrService dependency injection.
   * @param iconLibraries   NbIconLibraries dependency injection.
   */
  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private iconLibraries: NbIconLibraries,
    private accountsIPCService: AccountsIPCService,
    public accountsStore: AccountsStoreX,
    private sessionStore: SessionStore
  ) {
    this.iconLibraries.registerFontPack('whhg', { iconClassPrefix: 'icon' });
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'name' },
      { name: 'Server' },
      { name: 'Created', cellTemplate: this.mDateTpl },
      { name: 'Modified', cellTemplate: this.mDateTpl },
      { cellTemplate: this.actionsTpl }
    ];
  }

  /**
   * Filter data table result (search)
   * 
   * @param event Search input type event.
   */
  updateFilter(event): void {
    console.log("update filter", event.target.value);
    const val = event.target.value.toLowerCase();
    this.accountsStore.setFilterDisplayBy(val);
  }

  /**
   * Initialize account editor wizard
   * 
   * @param row Data table row
   */
  edit(row): void {
    this.dialogService
      .open<any>(AddEditAccountComponent, { 
        hasBackdrop: true,
        context: {
          account: row ? row.id : undefined
        }
      })
  }

  /**
   * Delete account from store
   * 
   * @param row Data table row
   */
  delete(row): void {
    this.dialogService
      .open(ConfirmDeleteComponent, { hasBackdrop: true })
      .onClose
      .subscribe((res) => {
        if (res)  {
          this.accountsStore.removeAccount(row.id);
        }
      });
  }

  /**
   * Use account (create connection & load account data)
   * 
   * @param row Data table row
   */
  async use(row) {
    this.isLoading = true;
    const account:Account = this.accountsStore.getById(row.id);

    const res: IIPCConnectResponseMessage = await this.accountsIPCService.connect(account);
    this.isLoading = false;
    if (res.valid) {
      this.sessionStore.setActiveAccount(account);
      this.toastrService.show(status, `Connected to ${account.name}.`, { status: "success" });
    } else {
      this.toastrService.show(status, res.error, { status: "danger" });
    }
  }

}