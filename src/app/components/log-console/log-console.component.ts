import { Component, OnInit } from '@angular/core';
import { ConsoleLogItem, ConsoleLogItemSource, ConsoleLogItemType } from '../../../shared/interfaces/log-console.interface';
import { LogConsoleService } from '../../services/log-console.service';

@Component({
  selector: 'app-log-console',
  templateUrl: './log-console.component.html',
  styleUrls: ['./log-console.component.scss']
})
export class LogConsoleComponent implements OnInit {

  logTypes = ConsoleLogItemType;
  logItems: (ConsoleLogItem & {source: ConsoleLogItemSource, sourceName?: string})[] = [];
  isMinimized: boolean = false;

  constructor(
    private logConsoleService: LogConsoleService
  ) { }
  
  ngOnInit(): void {
    this.logConsoleService.logItems$.subscribe(obj => {
      
      this.logItems.push({
        ...obj,
        sourceName: ConsoleLogItemSource[obj.source]
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

}
