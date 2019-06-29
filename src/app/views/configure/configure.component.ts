import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { IView } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import {
  NbSpinnerService
} from '@nebular/theme';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  view: IView;
  isLoading: boolean = false;
  title: string;
  selectedTableModel:NgModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.title = `${this.view.name} View Configure`;
    } else {
      // no id, we are in add mode
      this.title = "Add New View";
    }
  }

  selectedChange() {
    console.log(this.selectedTableModel)
  }

  public get isEdit(): boolean {
    return this.view && this.view.id > 0;
  }

}
