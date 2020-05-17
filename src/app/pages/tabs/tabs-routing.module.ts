import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        // loadChildren: '../home/home.module#HomePageModule'
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'info',
        // loadChildren: '../info/info.module#InfoPageModule'
        loadChildren: () => import('../info/info.module').then( m => m.InfoPageModule)
      },
      {
        path: 'akun',
        // loadChildren: '../akun/akun.module#AkunPageModule'
        loadChildren: () => import('../akun/akun.module').then( m => m.AkunPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
