import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { 
  NbMenuService, 
  NbSidebarService, 
  NbSearchService, 
  NbMenuItem, 
  NbIconLibraries
} from '@nebular/theme';
import { IAccount } from '../shared/interfaces/accounts.interface';
import { SessionService } from './services/session.service';
import { IView } from '../shared/interfaces/views.interface';
import { version } from '../../package.json';
import { ViewsService } from './services/store/views.service';
import { AccountsStoreX } from './store/accounts.store';
import { reaction } from 'mobx';
import { SessionStore } from './store/session.store';
import { enableLogging } from 'mobx-logger';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account:IAccount;
  versionFromPkg: string = version;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  defaultItems: NbMenuItem[] = [
    {
      title: 'Views',
      icon: 'folder-outline',
      expanded: true,
      children: [
 
      ]
    },
    {
      title: 'Add View',
      icon: 'plus-outline',
      link: '/views/add',
    },
    {
      title: 'Custom Query',
      icon: 'arrow-right',
      link: '/views/query',
    }
   ];
  items:NbMenuItem[] = [...this.defaultItems];

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private searchService: NbSearchService,
    private viewsService: ViewsService,
    public sessionStore: SessionStore,
    public accountsStore: AccountsStoreX) {

      enableLogging();
      
      translate.setDefaultLang('en');
      console.log('AppConfig', AppConfig);

      if (electronService.isElectron()) {
        console.log('Mode electron');
        console.log('Electron ipcRenderer', electronService.ipcRenderer);
        console.log('NodeJS childProcess', electronService.childProcess);
      } else {
        console.log('Mode web');
      }

      reaction(
        () => this.sessionStore.activeAccount,
        () => this.reload()
      )

      this.viewsService.changes.subscribe(() => this.reload());
  }

  reload() {
    console.log("reload", this.sessionStore.activeAccount);
    let views:IView[] = this.viewsService.all();
    console.log(this.defaultItems);

    this.items = [...this.defaultItems];
    this.items[0].children = [];
    views.forEach((view:IView) => {
      console.log(view);
      this.items[0].children.push({
        title: view.name,
        icon: 'layers-outline',
        link: `/views/${view.id}/view`
      })
    })
  }
}
