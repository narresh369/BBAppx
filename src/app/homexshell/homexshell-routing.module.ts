import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomexshellShellResolver } from './homexshell-shell.resolver';
import { HomexshellShellResolver2 } from './homexshell-shell.resolver2';
import { HomexshellShellResolver3 } from './homexshell-shell.resolver3';

import { HomexshellPage } from './homexshell.page';

/* const routes: Routes = [
  {
    path: '',
    component: HomexshellPage
  }
]; */
const routes: Routes = [
  {
    path: '',
    component: HomexshellPage,
    resolve: {
      data1: HomexshellShellResolver,
      data2: HomexshellShellResolver2,
      data3: HomexshellShellResolver3
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomexshellPageRoutingModule {}
