import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { 
  NbMenuService, 
  NbSidebarService, 
  NbSearchService, 
  NbMenuItem 
} from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  items: NbMenuItem[] = [
    {
      title: 'Views',
      group: true,
      icon: 'folder-outline'
    },
    {
      title: 'Table 1',
      link: '/',
      icon: 'layers-outline'
    },
    {
      title: 'Table 2',
      link: 'dashboard',
      icon: 'layers-outline'
    }
   ];

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private searchService: NbSearchService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
