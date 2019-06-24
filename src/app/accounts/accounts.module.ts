import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbTooltipModule, NbDialogModule } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AccountsComponent],
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
  ],
  entryComponents: [AccountsComponent]
})
export class AccountsModule { }
