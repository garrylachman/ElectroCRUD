import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { 
  NbMenuService, 
  NbSidebarService, 
  NbSearchService, 
  NbMenuItem, 
  NbIconLibraries,
  NbThemeService,
  NbSelectComponent
} from '@nebular/theme';
import { IAccount } from '../shared/interfaces/accounts.interface';
import { SessionService } from './services/session.service';
import { IView } from '../shared/interfaces/views.interface';
import { version } from '../../package.json';
import { ViewsService } from './services/store/views.service';
import { ExtensionsIPCService } from './services/ipc/extensions.ipc.service'

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
      badge: {
        text: '0',
        status: 'primary',
      },
      children: []
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
    private sessionService: SessionService,
    private themeService: NbThemeService,
    private extensionsService: ExtensionsIPCService) {
      
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    console.log("extensions", this.extensionsService.list());
    console.log("views", this.extensionsService.getViewsScripts());
    this.extensionsService.getViewsScripts().then(x => console.log(x))

    this.sessionService.changes.subscribe({
      next: (v:IAccount) => {
        this.account = v;
        if (v)  {
          this.reload();
        }
      }
    })

    this.viewsService.changes.subscribe(() => this.reload());
  }

  changeTheme($event) {
    console.log($event);
    this.themeService.changeTheme($event);
  }

  reload() {
    console.log("reload - menu")
    let views:IView[] = this.viewsService.all();
    
    this.items = [...this.defaultItems].map(v => ({...v}));
    
    //this.items[0].children = [];

    const viewItems: any[] = [...views].map((view) => ({...{
      title: view.name,
      icon: 'layers-outline',
      link: `/views/${view.id}/view`
    }}));

    console.log("viewItems", Array.from(viewItems))

    this.items[0].children = viewItems; 
    //this.defaultItems[0].children = 

    this.items[0].badge.text = `${this.items[0].children.length}`;

    /*views.forEach((view:IView) => {
      console.log(view);
      viewItems.push({
        title: view.name,
        icon: 'layers-outline',
        link: `/views/${view.id}/view`
      })
    })*/

    //this.defaultItems[0].children = [...viewItems]
    //this.items = [...this.defaultItems].map(v => ({...v}));
    console.log("this.items", [...this.items]);
    //this.items = [...this.items];
  }
}
