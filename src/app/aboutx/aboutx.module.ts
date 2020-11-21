import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutxPageRoutingModule } from './aboutx-routing.module';

import { AboutxPage } from './aboutx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutxPageRoutingModule
  ],
  declarations: [AboutxPage]
})
export class AboutxPageModule {}
