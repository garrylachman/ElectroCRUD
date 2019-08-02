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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account:IAccount;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  defaultItems: NbMenuItem[] = [
    {
      title: 'Views',
      group: true,
      icon: 'folder-outline'
    }
   ];
  items:NbMenuItem[] = [...this.defaultItems];

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private searchService: NbSearchService,
    private sessionService: SessionService) {
      
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    this.sessionService.changes.subscribe({
      next: (v:IAccount) => {
        this.account = v;
        if (v)  {
          this.reload();
        }
      }
    })

    this.sessionService.viewsChanges.subscribe(() => this.reload());
  }

  reload() {
    let views:IView[] = this.sessionService.activeAccountViewsFromStore;

    this.items = [...this.defaultItems];
    views.forEach((view:IView) => {
      console.log(view);
      this.items.push({
        title: view.name,
        icon: 'layers-outline',
        link: `/views/${view.id}/view`
      })
    })
  }
}
