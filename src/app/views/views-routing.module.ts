import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component'
import { EmptyComponent } from './empty/empty.component'
import { ConfigureComponent } from './configure/configure.component'

const routes: Routes = [
  {
    path: ':id/view',
    component: ViewComponent
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
