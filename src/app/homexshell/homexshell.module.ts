import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomexshellPageRoutingModule } from './homexshell-routing.module';

import { HomexshellPage } from './homexshell.page';
import { HomexshellShellResolver } from './homexshell-shell.resolver';
import { HttpClientModule } from '@angular/common/http';
import { HomexshellShellResolver2 } from './homexshell-shell.resolver2';
import { HomexshellShellResolver3 } from './homexshell-shell.resolver3';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomexshellPageRoutingModule
  ],
  declarations: [HomexshellPage],
  providers: [HomexshellShellResolver,HomexshellShellResolver2,HomexshellShellResolver3]
})
export class HomexshellPageModule {}
