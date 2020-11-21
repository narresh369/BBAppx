import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesDetailPageRoutingModule } from './categories-detail-routing.module';

import { CategoriesDetailPage } from './categories-detail.page';
import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesDetailPageRoutingModule,
    IonicImageLoader
  ],
  declarations: [CategoriesDetailPage]
})
export class CategoriesDetailPageModule {}
