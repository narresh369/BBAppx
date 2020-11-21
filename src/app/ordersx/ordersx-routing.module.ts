import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersxPage } from './ordersx.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersxPageRoutingModule {}
