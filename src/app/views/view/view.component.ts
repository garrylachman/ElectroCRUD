import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IView } from '../../../shared/interfaces/views.interface';
import { ViewsService } from '../../services/store/views.service';
import { BreadcrumbsService, BreadcrumbsTreeNode } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, DoCheck {

  bc: BreadcrumbsTreeNode[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewsService: ViewsService,
    private breadcrumbsService: BreadcrumbsService
  ) { }

  view: IView;


  ngDoCheck() {
    this.bc = [];
    let cChild = this.breadcrumbsService.tree;
    while(cChild) {
      this.bc.push(cChild);
      cChild = cChild.child;
    }
  }

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
      //this.title = this.view.name + this.route.data['subpage'];
      this.breadcrumbsService.firstChild(this.view.name, `/views/${this.view.id}/view`);
    }
  }
}
