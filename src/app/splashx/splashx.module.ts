import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashxPageRoutingModule } from './splashx-routing.module';

import { SplashxPage } from './splashx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashxPageRoutingModule
  ],
  declarations: [SplashxPage]
})
export class SplashxPageModule {}
