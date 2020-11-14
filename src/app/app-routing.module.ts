import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/accounts'
    },
    {
        path: 'accounts',
        loadChildren: './accounts/accounts.module#AccountsModule'
    },
    {
        path: 'views',
        loadChildren: './views/views.module#ViewsModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
