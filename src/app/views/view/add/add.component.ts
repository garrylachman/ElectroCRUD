import { Component, OnInit, OnDestroy } from '@angular/core';
import { IView } from '../../../../shared/interfaces/views.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { ViewsService } from '../../../services/store/views.service';
import { ViewsIPCService } from '../../../services/ipc/views.ipc.service';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Subscription, Subject } from 'rxjs';
import { IIPCReadDataWhereOpr, IIPCUpdateDataWhereOpr, IIPCUpdateDataResponseMessage } from '../../../../shared/ipc/views.ipc';
import { RowFormComponent } from '../components/row-form/row-form.component'

@Component({
  selector: 'app-view-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ViewAddComponent implements OnInit, OnDestroy {

  view: IView;
  isLoading: boolean = false;
  title: string;

  routeObserver:Subscription;
  data: any;

  formRef: {
    save: Function
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,
    private viewsService: ViewsService,
    private viewsIPCService: ViewsIPCService,
    private menuService: NbMenuService,
    private toastService: NbToastrService,
  ) { }

  async ngOnInit() {
    this.routeObserver = this.route.parent.params.subscribe((params) => {
      console.log("params", params);
      this.loadView();
    });

    this.formRef = {
      save: async (data): Promise<boolean> => {
        return true;
        // let res:IIPCUpdateDataResponseMessage = await this.viewsIPCService.updateData(
        //   this.view.table, 
        //   data
        // )

        // if (res.error) {
        //   this.toastService.danger(res.error, 'Error');
        //   return false;
        // } else {
        //   if (res.valid) {
        //     this.toastService.success('Insert completed successfully ', 'Success');
        //   }
        // }
        // this.router.navigate(['/views',this.view.id,'view','view'])
      }
    }
  }

  ngOnDestroy() {
    this.routeObserver.unsubscribe();
  }
  
 
  async loadView() {
    if (this.route.parent.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.parent.snapshot.paramMap.get('id'))
      );
      this.title = this.view.name;
    }
  }

}
