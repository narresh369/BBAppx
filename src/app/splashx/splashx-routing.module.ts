import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashxPage } from './splashx.page';

const routes: Routes = [
  {
    path: '',
    component: SplashxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashxPageRoutingModule {}
