import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ConfirmDeleteComponent,
    AddEditWidgetModalComponent,
    AddEditFilterModalComponent
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
    Ng2FittextModule
  ],
  providers: [ElectronService, NbMenuService, NbDialogService, AccountsService, NbDatepickerDirective],
  entryComponents: [ConfirmDeleteComponent, AddEditWidgetModalComponent, AddEditFilterModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
