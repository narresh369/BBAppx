import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestxPage } from './testx.page';

const routes: Routes = [
  {
    path: '',
    component: TestxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestxPageRoutingModule {}
