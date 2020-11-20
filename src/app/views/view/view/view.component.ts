import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IView } from '../../../../shared/interfaces/views.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { ViewsService } from '../../../services/store/views.service';
import { ViewsIPCService } from '../../../services/ipc/views.ipc.service';
import { NgModel } from '@angular/forms';
import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from '../../../components/dialogs/confirm-delete/confirm-delete.component';
import { IIPCDeleteDataWhereOpr, IIPCDeleteDataResponseMessage, IIPCReadDataWhere, IIPCReadDataJoin, IIPCReadDataWhereOpr } from '../../../../shared/ipc/views.ipc';
import { BreadcrumbsService } from '../../../services/breadcrumbs.service';
import { IViewFilter } from '../../../../shared/interfaces/filters.interface';
import { timer } from 'rxjs';
import { WidgetsComponent } from './components/widgets/widgets.component'
import { IExtensionContentScriptView } from '../../../../shared/interfaces/extension.interface';
import { ExtensionsIPCService } from '../../../services/ipc/extensions.ipc.service';

@Component({
  selector: 'app-view-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewViewComponent implements OnInit, OnDestroy {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableContextMenuTmpl', { static: true }) tableContextMenuTmpl: TemplateRef<any>;
  @ViewChild('subviewTableIconTmpl', { static: true }) subviewTableIconTmpl: TemplateRef<any>;
  @ViewChild(WidgetsComponent) widgets: WidgetsComponent;

  view: IView;
  isLoading: boolean = false;
  title: string;

  rows = [];
  columns = [];

  totalElements:number = 0;
  offset: number = 0;
  limit: number = 10;

  searchInputModel: NgModel;
  showSearchClear: boolean = false;

  menuItems:any = []

  menuServiceObserver:Subscription;
  routeObserver:Subscription;

  selectedFilter: IViewFilter;

  extensionViews: IExtensionContentScriptView[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService,
    private toastService: NbToastrService,
    private breadcrumbsService: BreadcrumbsService,
    private cdr: ChangeDetectorRef,
    private extensions: ExtensionsIPCService
  ) { }

  ngAfterViewChecked() {
    
  }

  async ngOnInit() {
    this.routeObserver = this.route.parent.params.subscribe((params) => {
      console.log("params", params);
      this.loadView();
    });

    this.menuServiceObserver = this.menuService.onItemClick().subscribe(item => {
      if (item.tag != "rowMenu") {
        return;
      }
      switch(item.item.title) {
        case 'Edit':
          this.editRow(item.item.data)
        break;
        case 'Delete':
          this.deleteRow(item.item.data);
        break;
      }
    });

    this.extensionViews = await this.extensions.getViewsScripts();
    console.log("this.extensionViews", this.extensionViews)
  }

  selectExtemnsionView($event) {
    console.log($event);
  }

  ngOnDestroy() {
    this.menuServiceObserver.unsubscribe();
    this.routeObserver.unsubscribe();
    this.breadcrumbsService.removeChildByURL(`/views/${this.view.id}/view/view`);
  }

  onFilterSelected(event: IViewFilter) {
    // set selected filter
    this.selectedFilter = event;
    // reload the data
    this.selectLimit(this.limit);
  }

  onFilterDeselected() {
    // remove any selected filter
    this.selectedFilter = null;
    // reload the data
    this.selectLimit(this.limit);
  }

  deleteView(): void {
    this.dialogService
      .open(ConfirmDeleteComponent, { hasBackdrop: true })
      .onClose
      .subscribe(async (res) => {
        if (res)  {
          this.viewsService.delete(this.view.id);
          //this.sessionsService.reloadViews();
          this.viewsService.triggerChanges();
          this.router.navigate(['/accounts']);
        }
      });
  }
  
  editRow(row): void {
    let pk: string = this.primaryKeyColumn;
    if (!pk) {
      // toast no OK
      return;
    }
    let pkValue = row[pk];
    this.router.navigate(['/views', this.view.id, 'view', 'edit', pk, pkValue])
  }

  deleteRow(row): void {
    let pk: string = this.primaryKeyColumn;
    if (!pk) {
      // toast no OK
      return;
    }
    let pkValue = row[pk];

    this.dialogService
      .open(ConfirmDeleteComponent, { hasBackdrop: true })
      .onClose
      .subscribe(async (res) => {
        if (res)  {
          const delRes:IIPCDeleteDataResponseMessage = await this.viewsIPCService.deleteData(
            this.view.table, 
            [
              {
                column: pk,
                opr: IIPCDeleteDataWhereOpr.EQ,
                value: pkValue,
                or: false
              }
            ]
          );
          
          if (delRes.error) {
            this.toastService.danger(res.error, 'Error');
            return false;
          } else {
            if (delRes.valid) {
              this.toastService.success('Update completed successfully ', 'Success');
            }
          }
          this.selectLimit(this.limit)
        }
      });
  }

  clearSearch(): void {
    // reset search box input
    this.searchInputModel = '' as any;

    this.showSearchClear = false;

    // fast way to reload results
    this.selectLimit(this.limit);
  }

  selectLimit(value): void {
    this.limit = Number(value);
    this.offset = 0;
    this.setPage({
      offset: this.offset,
      limit: this.limit,
      pageSize: this.limit
    })
  }

  get primaryKeyColumn(): string {
    let pri:string = null;
    this.view.columns.forEach(col => {
      if (col.key == "PRI") {
        pri = col.name;
      }
    })
    return pri;
  }

  async loadView() {
    if (this.route.parent.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.parent.snapshot.paramMap.get('id'))
      );
      //this.title = this.view.name;
    }
    this.menuItems = [
      {
        title: 'Edit',
        icon: 'edit-2',
        hidden: !this.view.permissions.update
      },
      {
        title: 'Delete',
        icon: 'trash-2',
        hidden: !this.view.permissions.delete
      }
    ]
    this.breadcrumbsService.addChild('View', `/views/${this.view.id}/view/view`);

    await this.reload();
  }

  private getViewJoints(): IIPCReadDataJoin[] {
    return this.view
      .columns
      .filter(col => col.ref)
      .map(col => (
        {
          table: col.ref.table,
          on: {
            local: col.name,
            target: col.ref.match_column,
            opr: IIPCReadDataWhereOpr.EQ
          }
        } as IIPCReadDataJoin
      ));
  }

  async reload() {
    this.isLoading = true;
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns.filter(col => col.enabled).map(col => col.name), 
        this.limit, 
        this.offset,
        null,
        null,
        [],
        this.getViewJoints()
        );
    this.totalElements = data.count;
    let columns = data.data.length > 0 ? Object.keys([...data.data].shift()).map(val => ({ name: val, prop: val })) : [];
    console.log("columns", columns)
    let subviewActionColumn = this.view.subview && this.view.subview.enabled ? [{ cellTemplate: this.subviewTableIconTmpl, frozenLeft: true, maxWidth: 50, resizeable: false }] : [];
    this.columns = [
      ...subviewActionColumn,
      ...columns, 
      { cellTemplate: this.tableContextMenuTmpl, frozenRight: true, maxWidth: 50, resizeable: false }
    ];
    this.rows = [...data.data];
    console.log("rows", this.rows)
    console.log(data);
    timer(2000).subscribe(() => { 
      this.isLoading = false;
      this.cdr.detectChanges();
    });
    console.log("this.widgets", this.widgets)
    this.widgets.reloadData();
  }

  async setPage(pageInfo){
    this.isLoading = true;
    console.log("pageInfo:", pageInfo);
    this.offset = pageInfo.offset;
    let sqlOffset = this.offset * pageInfo.pageSize;
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns.map(col => col.name), 
        this.limit, 
        sqlOffset,
        this.view.columns.filter(col => col.searchable).map(col => col.name),
        (this.searchInputModel && String(this.searchInputModel).length > 1) ? String(this.searchInputModel)  : null,
        this.selectedFilter ? this.selectedFilter.where as IIPCReadDataWhere[] : null,
        this.getViewJoints()
      );
    this.rows = [...data.data];
    this.totalElements = data.count;

    timer(1000).subscribe(() => { 
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  doSearch(event): void {
    this.showSearchClear = String(this.searchInputModel).length >1;

    // if no search input, the user clear the text, reload the result to reset
    if (String(this.searchInputModel).length == 0) return this.selectLimit(this.limit)

    // validate min. of 2 chars
    if (String(this.searchInputModel).length < 2) return;

    // fast way to reload the table
    this.selectLimit(this.limit);
  }

  setContextItems(row): void {
    this.menuItems = [...this.menuItems].map(mItem => {
      mItem.data = row;
      return mItem
    });
  }

  subviewTableAction(row): void {
    console.log("click", row);
    this.table.rowDetail.toggleExpandRow(row);

  }

  onSubviewToggle(event):void {
    console.log("onSubviewToggle", event);
  }

}
