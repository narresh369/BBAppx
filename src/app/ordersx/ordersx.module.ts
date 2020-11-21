import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersxPageRoutingModule } from './ordersx-routing.module';

import { OrdersxPage } from './ordersx.page';
import { IonicImageLoader } from 'ionic-image-loader';
//import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersxPageRoutingModule,
    IonicImageLoader,
    //PDFGenerator
    
  ],
  declarations: [OrdersxPage],
})
export class OrdersxPageModule {}
