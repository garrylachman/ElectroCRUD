import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IView } from '../../../shared/interfaces/views.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ViewsService } from '../../services/store/views.service';
import { ViewsIPCService } from '../../services/ipc/views.ipc.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  view: IView;
  isLoading: boolean = false;
  title: string;

  rows = [];
  columns = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.title = this.view.name;
    }
  }

}
