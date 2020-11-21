import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemToCartPage } from './add-item-to-cart.page';

const routes: Routes = [
  {
    path: '',
    component: AddItemToCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddItemToCartPageRoutingModule {}
