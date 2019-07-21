import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbDialogService, NbToastrService, NbMenuService, NbMenuBag } from '@nebular/theme';
import { IView } from '../../../../../../shared/interfaces/views.interface';
import { ViewsService } from '../../../../../services/store/views.service';
import { AddEditFilterModalComponent } from './add-edit-filter-modal/add-edit-filter-modal.component';
import { IViewFilter } from '../../../../../../shared/interfaces/filters.interface';
import { ConfirmDeleteComponent } from '../../../../../components/dialogs/confirm-delete/confirm-delete.component';
import { Subscription, Observable } from 'rxjs';

export enum FilterMenuActions {
  APPLY = 1,
  UNAPPLY = 2,
  EDIT = 3,
  DELETE = 4
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy, OnChanges {

   /**
   * Input for the filters view
   */
  @Input() view:IView;

  @Output() onFilterSelected: EventEmitter<IViewFilter> = new EventEmitter();
  @Output() onFilterDeselected: EventEmitter<void> = new EventEmitter();

  isOpen: boolean = false;
  menuItems: NbMenuItem[] = [];

  sidebarServiceOnToggleSub: Subscription;
  menuServiceOnItemSelectSub: Subscription;
  selectedMenuItem: NbMenuItem;


  constructor(
    private sidebarService: NbSidebarService,
    private viewsService:ViewsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService
  ) { }

  ngOnChanges(changes) {
    if (changes.view) {
      this.reloadData();
    }
  }

  onMenuClick() {
    if (!this.isOpen) {
      this.toggle();
    }
  }

  ngOnInit() {
    
    this.sidebarServiceOnToggleSub = this.sidebarService
    .onToggle()
    .subscribe((val) => {
      console.log("on Toggle", val);
      if (val.tag == "right") {
        this.isOpen = !this.isOpen;
      }
    });

    this.menuServiceOnItemSelectSub = this.menuService
    .onItemClick()
    .subscribe((item:NbMenuBag) => {
      if (item.tag != "filtersMenu") {
        return;
      }
      console.log("item: ", item);
      if (item.item.data.action == FilterMenuActions.UNAPPLY) {
        // in case of unapply deselect
        this.selectedMenuItem = null;
        this.onFilterDeselected.emit(null);
      }

      if (item.item.data.action == FilterMenuActions.APPLY) {
        // in case of apply set selected
        this.selectedMenuItem = item.item
        // fire selected item to parent
        this.onFilterSelected.emit(this.selectedMenuItem.parent.data)
      }

      if (item.item.data.action == FilterMenuActions.EDIT) {
        this.edit(item.item.parent.data);
      }

      if (item.item.data.action == FilterMenuActions.DELETE) {
        this.remove(item.item.parent.data);
      }

      // reload the items
      this.reloadData();
    });

    this.reloadData();
  }

  ngOnDestroy() {
    this.sidebarServiceOnToggleSub.unsubscribe();
    this.menuServiceOnItemSelectSub.unsubscribe();
    this.menuItems = [];
  }

  toggle() {
    this.sidebarService.toggle(true, "right");
  }

  /**
   * Save the view after filter modifications
   */
  save(): void {
    this.viewsService.update(this.view);
  }

  /**
   * Add new filter, open add new filter modal
   */
  public add(): void {
    // Open Add / Edit dialog and wait for response (the user complete or close the dialog)
    this.dialogService
      .open<any>(AddEditFilterModalComponent, { 
        hasBackdrop: true,
        context: {
          view: this.view // In add senerio we share only the view.
        }
      })
      .onClose
      .subscribe((res) => {
        if (res) {
          // Type Guard, validate that 'res' is IViewFilter
          if ((res as IViewFilter).name) {
            // if view.filters is null, init the array
            if (!this.view.filters) {
              this.view.filters = [];
            }
            // Adds the filter to view.filters
            this.view.filters.push(res);
            // Save the view
            this.save();
            // Toast
            this.toastrService.success('The filter has been added');
            // Reload data from database
            this.reloadData();
          }
        }
      });
  }

  /**
   *  Edit filter, open edit filter modal
   * 
   * @param filter IViewFilter to edit
   */
  public edit(filter: IViewFilter): void {
    // Open Add / Edit dialog and wait for response (the user complete or close the dialog)
    this.dialogService
      .open<any>(AddEditFilterModalComponent, { 
        hasBackdrop: true,
        context: {
          view: this.view,
          filter: filter // In edit senerio we pass the filter we want to edit
        }
      })
      .onClose
      .subscribe((res) => {
        if (res) {
          // Type Guard, validate that 'res' is IViewFilter
          if ((res as IViewFilter).name) {
            // Save the view
            this.save();
            // Toast
            this.toastrService.success('The filter has been updated');
            // Reload data
            this.reloadData();
          }
        }
      });
  }

  /**
   * Delete filter from the view.
   * 
   * @param filter The filter for removal
   */
  remove(filter: IViewFilter): void {
    this.dialogService
      .open<any>(ConfirmDeleteComponent, { 
        hasBackdrop: true,
        context: {}
      })
      .onClose
      .subscribe((res) => {
        if (res) {
         let idx = this.view.filters.indexOf(filter);
         if (idx > -1) {
           this.view.filters.splice(idx, 1);
           this.save();
           // Reload data
           this.reloadData();
         }
        }
      });
    }

  /**
   * Load filters
   */
  reloadData(): void {
    this.menuItems = [];
    if (!this.view.filters) {
      return;
    }
    
    this.menuItems = [
      ...this.view.filters
    ]
    .map((item:IViewFilter): NbMenuItem => {
      let isApplyed =  (
        this.selectedMenuItem && 
        this.selectedMenuItem.parent && 
        this.selectedMenuItem.parent.data == item
      );
      // we have to create the instance first and then assign the childrens, 
      // some bug in NbMenuItem not save the parent if the NbMenuItem created once again,
      // this is a workaround.
      let menuItem:NbMenuItem = new NbMenuItem();
      menuItem.title = item.name;
      menuItem.icon = item.icon;
      menuItem.data = item;
      menuItem.selected = isApplyed;
      menuItem.children = [
        {
          parent: menuItem,
          title: isApplyed ? 'UnApply' : 'Apply',
          data: {
            action: isApplyed ? FilterMenuActions.UNAPPLY : FilterMenuActions.APPLY
          }
        }, 
        {
          parent: menuItem,
          title: 'Edit',
          data: {
            action: FilterMenuActions.EDIT
          }
        },
        {
          parent: menuItem,
          title: 'Delete',
          data: {
            action: FilterMenuActions.DELETE
          }
        }
      ]

      return menuItem;
    })
  }

}
