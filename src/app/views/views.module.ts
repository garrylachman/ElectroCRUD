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
  NbContextMenuModule,
  NbDatepickerModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewEditComponent } from './view/edit/edit.component';
import { ViewAddComponent } from './view/add/add.component';
import { ViewViewComponent } from './view/view/view.component';
import { RowFormComponent } from './view/components/row-form/row-form.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldNbInputComponent } from './view/components/row-form/custom-types/formly-field-nb-input/formly-field-nb-input.component';
import { FormlyFieldNbSelectComponent } from './view/components/row-form/custom-types/formly-field-nb-select/formly-field-nb-select.component';
import { FormlyFieldNbChechboxComponent } from './view/components/row-form/custom-types/formly-field-nb-chechbox/formly-field-nb-chechbox.component';
import { FormlyFieldNbDatepickerComponent } from './view/components/row-form/custom-types/formly-field-nb-datepicker/formly-field-nb-datepicker.component';
import { FormlyFieldNbTextareaComponent } from './view/components/row-form/custom-types/formly-field-nb-textarea/formly-field-nb-textarea.component';
import { NgxMaskModule } from 'ngx-mask';
import { WidgetsComponent } from './view/view/components/widgets/widgets.component';
import { Ng2FittextModule } from "ng2-fittext";

@NgModule({
  declarations: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, WidgetsComponent, ViewViewComponent, RowFormComponent, FormlyFieldNbInputComponent, FormlyFieldNbSelectComponent, FormlyFieldNbChechboxComponent, FormlyFieldNbDatepickerComponent, FormlyFieldNbTextareaComponent],
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
    NgxMaskModule.forChild(),
    NbDatepickerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'nb-input',
          component: FormlyFieldNbInputComponent
        },
        {
          name: 'nb-datepicker',
          component: FormlyFieldNbDatepickerComponent
        }
      ]
    }),
    Ng2FittextModule.forRoot(),
  ],
  entryComponents: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, ViewViewComponent]
})
export class ViewsModule { }
