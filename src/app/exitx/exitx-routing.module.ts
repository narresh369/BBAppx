import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExitxPage } from './exitx.page';

const routes: Routes = [
  {
    path: '',
    component: ExitxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExitxPageRoutingModule {}
