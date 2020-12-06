import { Component, OnInit, Input } from '@angular/core';
import { IView } from '../../../../../../shared/interfaces/views.interface';
import { IWidget } from '../../../../../../shared/interfaces/widgets.interface';
import { ViewsService } from '../../../../../services/store/views.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddEditWidgetModalComponent } from './add-edit-widget-modal/add-edit-widget-modal.component';
import { ViewsIPCService } from '../../../../../services/ipc/views.ipc.service';
import { IPCReadWidgetData } from '../../../../../../shared/ipc/views.ipc';
import { ConfirmDeleteComponent } from '../../../../../components/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  /**
   * Input for the widgets view
   */
  @Input() view:IView;

  /**
   * 
   * @param viewsService ViewsService dependency injection.
   */
  constructor(
    private viewsService:ViewsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private viewsIPCService: ViewsIPCService,
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  /**
   * Save the view after widgets modifications
   */
  save(): void {
    this.viewsService.update(this.view);
  }

  /**
   * Add new widget, open add new widget modal
   */
  public add(): void {
    // Open Add / Edit dialog and wait for response (the user complete or close the dialog)
    this.dialogService
      .open<any>(AddEditWidgetModalComponent, { 
        hasBackdrop: true,
        context: {
          view: this.view // In add senerio we share only the view.
        }
      })
      .onClose
      .subscribe((res) => {
        if (res) {
          // Type Guard, validate that 'res' is IWidget
          if ((res as IWidget).name) {
            // if view.widgets is null, init the array
            if (!this.view.widgets) {
              this.view.widgets = [];
            }
            // Adds the widget to view.widgets
            this.view.widgets.push(res);
            // Save the view
            this.save();
            // Toast
            this.toastrService.success('The widget has been added');
            // Reload data from database
            this.reloadData();
          }
        }
      });
  }

  /**
   *  Edit widget, open edit widget modal
   * 
   * @param widget IWidget to edit
   */
  public edit(widget: IWidget): void {
    // Open Add / Edit dialog and wait for response (the user complete or close the dialog)
    this.dialogService
      .open<any>(AddEditWidgetModalComponent, { 
        hasBackdrop: true,
        context: {
          view: this.view,
          widget: widget // In edit senerio we pass the widget we want to edit
        }
      })
      .onClose
      .subscribe((res) => {
        if (res) {
          // Type Guard, validate that 'res' is IWidget
          if ((res as IWidget).name) {
            // Save the view
            this.save();
            // Toast
            this.toastrService.success('The widget has been updated');
            // Reload data from database
            this.reloadData();
          }
        }
      });
  }

  /**
   * Delete widget from the view.
   * 
   * @param widget The widget for removal
   */
  remove(widget: IWidget): void {
    this.dialogService
      .open<any>(ConfirmDeleteComponent, { 
        hasBackdrop: true,
        context: {}
      })
      .onClose
      .subscribe((res) => {
        if (res) {
         let idx = this.view.widgets.indexOf(widget);
         if (idx > -1) {
           this.view.widgets.splice(idx, 1);
           this.save();
         }
        }
      });
  }

  /**
   * Reload data from database
   */
  @Input()
  reloadData(): void {
    if (!this.view.widgets) {
      return;
    }
    this.view.widgets.forEach(async (widget: IWidget) => {
      const res:IPCReadWidgetData.IResponse = await this.viewsIPCService.readWidgetData(
        this.view.table,
        widget.column,
        widget.distinct,
        widget.function,
        widget.where
      );
      if (res.valid) {
        widget.lastResult = res.data;
      }
      if (!res.valid && res.error) {
        this.toastrService.danger(res.error, `${widget.name} retrive data error`);
      }
    })
  }

}
