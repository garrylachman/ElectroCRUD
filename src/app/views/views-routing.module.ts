import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewViewComponent } from './view//view/view.component'
import { EmptyComponent } from './empty/empty.component'
import { ConfigureComponent } from './configure/configure.component'
import { ViewEditComponent } from './view/edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ViewAddComponent } from './view/add/add.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
  {
    path: ':id/empty',
    component: EmptyComponent
  },
  {
    path: ':id/configure',
    component: ConfigureComponent
  },
  {
    path: 'add',
    component: ConfigureComponent
  },
  {
    path: 'query',
    component: QueryComponent
  },
  {
    path: ':id/view',
    component: ViewComponent,
    children: [
      { 
        path: '', redirectTo: 'view'
      },
      {
        path: 'view',
        component: ViewViewComponent
      },
      {
        path: 'edit/:pk/:pkValue',
        component: ViewEditComponent
      },
      {
        path: 'add',
        component: ViewAddComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
