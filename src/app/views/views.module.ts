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
  NbSpinnerModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [ViewComponent, ConfigureComponent, EmptyComponent],
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
  ],
  entryComponents: [ViewComponent, ConfigureComponent, EmptyComponent]
})
export class ViewsModule { }
