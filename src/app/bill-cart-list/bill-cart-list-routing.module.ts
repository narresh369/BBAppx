import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillCartListPage } from './bill-cart-list.page';

const routes: Routes = [
  {
    path: '',
    component: BillCartListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillCartListPageRoutingModule {}
