import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExitxPageRoutingModule } from './exitx-routing.module';

import { ExitxPage } from './exitx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExitxPageRoutingModule
  ],
  declarations: [ExitxPage]
})
export class ExitxPageModule {}
