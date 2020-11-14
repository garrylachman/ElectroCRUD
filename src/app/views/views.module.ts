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
  NbDatepickerModule,
  NbBadgeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbTabsetModule,
  NbAutocompleteModule
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
import { BreadcrumbsService } from '../services/breadcrumbs.service';
import { FiltersComponent } from './view/view/components/filters/filters.component';
import { AngularFittextModule } from 'angular-fittext';
import { SubViewComponent } from './view/view/components/sub-view/sub-view.component';
import { TagInputModule } from 'ngx-chips';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { QueryComponent } from './query/query.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

@NgModule({
  declarations: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, WidgetsComponent, ViewViewComponent, RowFormComponent, FormlyFieldNbInputComponent, FormlyFieldNbSelectComponent, FormlyFieldNbChechboxComponent, FormlyFieldNbDatepickerComponent, FormlyFieldNbTextareaComponent, FiltersComponent, SubViewComponent, QueryComponent],
  providers: [BreadcrumbsService],
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
    NbBadgeModule,
    NgxMaskModule.forChild(),
    NbDatepickerModule,
    NbTabsetModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'nb-input',
          component: FormlyFieldNbInputComponent
        },
        {
          name: 'nb-datepicker',
          component: FormlyFieldNbDatepickerComponent
        },
        {
          name: 'nb-textarea',
          component: FormlyFieldNbTextareaComponent
        },
        {
          name: 'nb-checkbox',
          component: FormlyFieldNbChechboxComponent
        }
      ]
    }),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    AngularFittextModule,
    TagInputModule,
    NgBootstrapFormValidationModule,
    MonacoEditorModule,
  ],
  entryComponents: [ViewComponent, ConfigureComponent, EmptyComponent, ViewEditComponent, ViewAddComponent, ViewViewComponent, WidgetsComponent, SubViewComponent, QueryComponent]
})
export class ViewsModule { }
