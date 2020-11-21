import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutxPage } from './aboutx.page';

const routes: Routes = [
  {
    path: '',
    component: AboutxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutxPageRoutingModule {}
