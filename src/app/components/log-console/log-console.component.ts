import { Component, OnInit, Renderer2 } from '@angular/core';
import { ConsoleLogItem, ConsoleLogItemSource, ConsoleLogItemType } from '../../../shared/interfaces/log-console.interface';
import { LogConsoleService } from '../../services/log-console.service';

@Component({
  selector: 'app-log-console',
  templateUrl: './log-console.component.html',
  styleUrls: ['./log-console.component.scss']
})
export class LogConsoleComponent implements OnInit {

  logTypes = ConsoleLogItemType;
  logItems: (ConsoleLogItem & {
    source: ConsoleLogItemSource, 
    sourceName?: string,
    method?: string
  })[] = [];
  isMinimized: boolean = false;

  constructor(
    private logConsoleService: LogConsoleService,
    private renderer: Renderer2
  ) { }
  
  ngOnInit(): void {
    this.logConsoleService.logItems$.subscribe(obj => {
      
      this.logItems.push({
        ...obj,
        sourceName: ConsoleLogItemSource[obj.source],
        method: obj.method
      });
      setTimeout(() => this.scrollDown(), 500);
    });
  }

  scrollDown() {
    let d = document.querySelector('nb-list');
    if(d)
    {
      d.scrollTop = d.scrollHeight;
    }
  }

  toggleClass(_event: any, _class: string) {
    const hasClass = _event.target.classList.contains(_class);
  
    if(hasClass) {
      this.renderer.removeClass(_event.target, _class);
    } else {
      this.renderer.addClass(_event.target, _class);
    }
  }

}
