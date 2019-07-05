import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IView } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  title:string =  'ViewComponent'
  viewId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewsService: ViewsService
  ) { }

  view: IView;

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadView();
    })
  }

  async loadView() {
    if (this.route.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.title = this.view.name;
    }
  }
}
