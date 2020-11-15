import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule, 
  NbTooltipModule, 
  NbDialogModule, 
  NbStepperModule,
  NbSelectModule,
  NbCheckboxModule,
  NbAlertModule,
  NbActionsModule,
  NbSpinnerModule,
  NbLayoutModule,
  NbFormFieldModule
} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AccountsComponent, AddEditAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    NbCardModule,
    NbIconModule,
    NgxDatatableModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbCheckboxModule,
    NgxMaskModule.forChild(),
    NbAlertModule,
    NbActionsModule,
    NbSpinnerModule,
    NbLayoutModule,
    NbFormFieldModule
  ],
  entryComponents: [AccountsComponent, AddEditAccountComponent]
})
export class AccountsModule { }
