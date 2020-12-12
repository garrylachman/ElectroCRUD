import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NbSortDirection, NbDialogService, NbToastrService, NbIconLibraries, NbSpinnerService  } from '@nebular/theme';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteComponent} from '../components/dialogs/confirm-delete/confirm-delete.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AccountsService, ServerType, ServerIcon } from '../services/store/accounts.service';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { SessionService } from '../services/session.service';
import { IPCConnect } from '../../shared/ipc/accounts.ipc';
import { timer } from 'rxjs';
import { LogConsoleService } from '../services/log-console.service';
import { ConsoleLogItemType } from '../../shared/interfaces/log-console.interface';

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
  isSpinLoading: boolean = false;

  /**
   * Is data table re-order enabled
   */
  reorderable: boolean = true;

  @ViewChild(DatatableComponent) table: DatatableComponent;
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
    private cdr: ChangeDetectorRef,
    private logConsoleService: LogConsoleService
  ) {
    this.iconLibraries.registerFontPack('whhg', { iconClassPrefix: 'icon' });
    this.temp = [...this.rows];
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'name', cellClass: 'pl-0', headerClass: 'pl-0' },
      { name: 'Server' },
      { name: 'Created', cellTemplate: this.mDateTpl },
      { name: 'Modified', cellTemplate: this.mDateTpl },
      { cellTemplate: this.actionsTpl, cellClass: 'pr-0 text-right', headerClass: 'pr-0', sortable: false }
    ];
    this.loadFromStore();

    this.sessionService.changes.subscribe({ 
      next: (v:IAccount) => {
        if (!v) {
          return;
        }
        this.rows.forEach(row => {
          row.isActive = (row.id == v.id);
        })
      }
    })
  }

  /**
   * Load accounts from store
   */
  loadFromStore(): void {
    this.rows = this.accountsService
      .all()
      .map((row) => {
        return {
          id: row.id,
          name: row.name,
          server: ServerType[`${row.server.server_type}`],
          icon: ServerIcon[`${row.server.server_type}`],
          created: new Date(row.creation_date),
          modified: new Date(row.modify_date),
          isActive: false
        }
      })
    this.temp = [...this.rows];
  }

  /**
   * Filter data table result (search)
   * 
   * @param event Search input type event.
   */
  updateFilter(event): void {
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

  /**
   * Initialize account editor wizard
   * 
   * @param row Data table row
   */
  edit(row): void {
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
          this.accountsService.delete(row.id);
          this.loadFromStore();
        }
      });
  }

  /**
   * Use account (create connection & load account data)
   * 
   * @param row Data table row
   */
  async use(row) {
    this.isSpinLoading = true;
    let account:IAccount = this.accountsService.get(row.id);
    let res:IPCConnect.IResponse = await this.sessionService.setActiveAccount(account);
    timer(2000).subscribe(() => { 
      this.isSpinLoading = false;
      this.cdr.detectChanges();
    });
    //this.isSpinLoading = false;
    if (!res.valid) {
      this.toastrService.show(status, res.error, { status: "danger" });
      this.logConsoleService.addItem(ConsoleLogItemType.error, res.error)
    } else {
      this.toastrService.show(status, `Connected to ${account.name}.`, { status: "success" });
      this.logConsoleService.addItem(ConsoleLogItemType.success, `Connected to ${account.name}.`)
    }
  }

}