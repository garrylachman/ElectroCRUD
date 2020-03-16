import 'reflect-metadata';
import '../polyfills';
import { AppConfig } from '../environments/environment';
import { version } from '../../package.json';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbDatepickerModule, NbDatepickerDirective, NbInputModule, NbSelectModule, NbCheckboxModule, NbAlertModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { 
  NbSidebarModule,
  NbLayoutModule, 
  NbButtonModule, 
  NbActionsModule,
  NbSearchModule,
  NbMenuService,
  NbIconModule,
  NbMenuModule,
  NbTooltipModule,
  NbCardModule,
  NbDialogService,
  NbDialogModule,
  NbToastrModule
} from '@nebular/theme';
import { ConfirmDeleteComponent } from './components/dialogs/confirm-delete/confirm-delete.component';

import { NgxMaskModule } from 'ngx-mask';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { AccountsService } from './services/store/accounts.service';
import { Ng2FittextModule } from "ng2-fittext";
import { AddEditWidgetModalComponent } from './views/view/view/components/widgets/add-edit-widget-modal/add-edit-widget-modal.component';
import { AddEditFilterModalComponent } from './views/view/view/components/filters/add-edit-filter-modal/add-edit-filter-modal.component';

import bugsnag from '@bugsnag/js';
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular';
import { ColumnReferanceDialogComponent } from './views/configure/components/column-referance-dialog/column-referance-dialog.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { SessionService } from './services/session.service';

import { MobxAngularModule } from 'mobx-angular';
import { AccountsStoreX } from './store/accounts.store';
import { SessionStore } from './store/session.store';


// configure Bugsnag ASAP, before any other imports
const bugsnagClient = bugsnag({
  apiKey: 'e887c2bdd46d07375e191b250e168764',
  appVersion: version,
  appType: 'ui',
  releaseStage: AppConfig.environment
})

// create a factory which will return the bugsnag error handler
export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient)
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


console.log("version: ", version ,", env: ", AppConfig.environment);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ConfirmDeleteComponent,
    AddEditWidgetModalComponent,
    AddEditFilterModalComponent,
    ColumnReferanceDialogComponent
  ],
  exports: [
    ConfirmDeleteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbActionsModule,
    NbSearchModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbTooltipModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
    NgxMaskModule.forRoot(),
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    NbAlertModule,
    FormlyModule.forRoot(),
    NbDatepickerModule.forRoot(),
    FormlyBootstrapModule,
    Ng2FittextModule,
    NgBootstrapFormValidationModule.forRoot(),
    MonacoEditorModule,
    MobxAngularModule,
  ],
  providers: [
    ElectronService, 
    NbMenuService, 
    NbDialogService, 
    AccountsService, 
    NbDatepickerDirective,
    {
      provide: ErrorHandler, 
      useFactory: errorHandlerFactory
    },
    SessionService,
    AccountsStoreX,
    SessionStore
  ],
  entryComponents: [ConfirmDeleteComponent, AddEditWidgetModalComponent, AddEditFilterModalComponent, ColumnReferanceDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
