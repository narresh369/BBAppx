import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';

//import 'gl-ionic-background-video';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // here is the schema declaration to add

})
export class LandingPageModule {}
