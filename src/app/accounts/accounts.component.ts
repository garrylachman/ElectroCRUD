import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbSortDirection, NbDialogService, NbToastrService, NbIconLibraries  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AccountsService, ServerType, ServerIcon } from '../services/store/accounts.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { SessionService } from '../services/session.service';
import { IIPCConnectResponseMessage } from '../../shared/ipc/accounts.ipc';
import { AccountsStoreX } from '../store/accounts.store';
import { observable } from 'mobx-angular';
import { toJS } from 'mobx';

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
   * Data table rows
   */
  rows = [];
  /**
   * Data table rows temp array to hold results while filtering
   */
  temp = [];
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
    private accountsService: AccountsService,
    private sessionService: SessionService,
    private toastrService: NbToastrService,
    private iconLibraries: NbIconLibraries,
    public accountsStore: AccountsStoreX
  ) {
    this.iconLibraries.registerFontPack('whhg', { iconClassPrefix: 'icon' });
    this.temp = [...this.rows];
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