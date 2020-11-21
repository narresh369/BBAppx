import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemToCartPageRoutingModule } from './add-item-to-cart-routing.module';

import { AddItemToCartPage } from './add-item-to-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddItemToCartPageRoutingModule
  ],
  declarations: [AddItemToCartPage]
})
export class AddItemToCartPageModule {}
