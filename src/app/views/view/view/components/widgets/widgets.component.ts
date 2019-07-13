import { Component, OnInit, Input } from '@angular/core';
import { IView } from '../../../../../../shared/interfaces/views.interface';
import { IWidget } from '../../../../../../shared/interfaces/widgets.interface';
import { ViewsService } from '../../../../../services/store/views.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  /**
   * Input for the widgets view
   */
  @Input() view:IView;

  /**
   * 
   * @param viewsService ViewsService dependency injection.
   */
  constructor(
    private viewsService:ViewsService
  ) { }

  ngOnInit() {
  }

  /**
   * Save the view after widgets modifications
   */
  save(): void {
    this.viewsService.update(this.view);
  }

}
