import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestxPageRoutingModule } from './testx-routing.module';

import { TestxPage } from './testx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestxPageRoutingModule
  ],
  declarations: [TestxPage]
})
export class TestxPageModule {}
