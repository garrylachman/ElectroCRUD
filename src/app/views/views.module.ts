import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewComponent } from './view/view.component';
import { ConfigureComponent } from './configure/configure.component';
import { EmptyComponent } from './empty/empty.component';

import {
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule, 
  NbTooltipModule, 
  NbSelectModule,
  NbCheckboxModule,
  NbAlertModule,
  NbActionsModule,
  NbSpinnerModule,
  NbContextMenuModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewEditComponent } from './view/edit/edit.component';
import { ViewAddComponent } from './view/add/add.component';
import { ViewViewComponent } from './view/view/view.component';



@NgModule({
  declarations: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, ViewViewComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    NbCardModule, 
    NbIconModule, 
    NbInputModule, 
    NbButtonModule, 
    NbTooltipModule, 
    NbSelectModule,
    NbCheckboxModule,
    NbAlertModule,
    NbActionsModule,
    NbSpinnerModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NbContextMenuModule,
  ],
  entryComponents: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, ViewViewComponent]
})
export class ViewsModule { }
