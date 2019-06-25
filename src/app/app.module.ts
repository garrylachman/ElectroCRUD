import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { NbThemeModule } from '@nebular/theme';
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
  NbDialogModule
} from '@nebular/theme';
import { ConfirmDeleteComponent } from './components/dialogs/confirm-delete/confirm-delete.component';

import { NgxMaskModule } from 'ngx-mask';

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
    NbThemeModule.forRoot({ name: 'default' }),
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
    NbDialogModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [ElectronService, NbMenuService, NbDialogService],
  entryComponents: [ConfirmDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
