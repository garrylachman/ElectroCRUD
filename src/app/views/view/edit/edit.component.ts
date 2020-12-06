import { Component, OnInit, OnDestroy } from '@angular/core';
import { IView } from '../../../../shared/interfaces/views.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { ViewsService } from '../../../services/store/views.service';
import { ViewsIPCService } from '../../../services/ipc/views.ipc.service';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Subscription, Subject } from 'rxjs';
import { IPCReadData, IPCUpdateData } from '../../../../shared/ipc/views.ipc';
import { RowFormComponent } from '../components/row-form/row-form.component'
import { BreadcrumbsService } from '../../../services/breadcrumbs.service';

@Component({
  selector: 'app-view-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ViewEditComponent implements OnInit, OnDestroy {

  view: IView;
  isLoading: boolean = false;
  title: string;

  routeObserver:Subscription;
  data: any;
  pk: string;
  pkValue: any;
  dataObserve: Subject<any> = new Subject();

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
    private breadcrumbsService: BreadcrumbsService
  ) { }

  async ngOnInit() {
    this.routeObserver = this.route.parent.params.subscribe((params) => {
      console.log("params", params);
      this.loadView();
    });

    this.formRef = {
      save: async (data): Promise<boolean> => {
        let res:IPCUpdateData.IResponse = await this.viewsIPCService.updateData(
          this.view.table, 
          data, 
          [
            {
              column: this.pk,
              value: this.pkValue,
              opr: IPCUpdateData.IIPCUpdateDataWhereOpr.EQ,
              or: false
            }
          ]
        )

        if (res.error) {
          this.toastService.danger(res.error, 'Error');
          return false;
        } else {
          if (res.valid) {
            this.toastService.success('Update completed successfully ', 'Success');
          }
        }
        this.router.navigate(['/views',this.view.id,'view','view'])
      }
    }
  }

  ngOnDestroy() {
    this.routeObserver.unsubscribe();
    this.breadcrumbsService.removeChildByURL(`/views/${this.view.id}/view/edit`);
  }
  
 
  async loadView() {
    if (this.route.parent.snapshot.paramMap.has('id')) {
      // has id, we are in edit mode
      this.view = this.viewsService.get(
        Number(this.route.parent.snapshot.paramMap.get('id'))
      );
      this.title = this.view.name;
      this.pk = this.route.snapshot.paramMap.get('pk');
      this.pkValue = this.route.snapshot.paramMap.get('pkValue');
      console.log(this.pk, this.pkValue)
    }
    this.breadcrumbsService.addChild('Edit', `/views/${this.view.id}/view/edit`);
    await this.reload();
  }

  async reload() {
    let data = await this.viewsIPCService
      .readData(
        this.view.table, 
        this.view.columns
          .filter(col => col.type != "referance")
          .map(col => col.name),
        1,
        0,
        null,
        null,
        [
          {
            column: this.pk,
            opr: IPCReadData.IIPCReadDataWhereOpr.EQ,
            value: this.pkValue,
            or: false
          }
        ]
      );
    this.dataObserve.next(data.data);
  }

}
