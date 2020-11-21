import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillCartListPageRoutingModule } from './bill-cart-list-routing.module';

import { BillCartListPage } from './bill-cart-list.page';

//import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillCartListPageRoutingModule,
    //NgxDatatableModule
  ],
  declarations: [BillCartListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BillCartListPageModule {}
