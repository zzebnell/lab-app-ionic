import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinMaquinasPage } from './sin-maquinas.page';

const routes: Routes = [
  {
    path: '',
    component: SinMaquinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinMaquinasPageRoutingModule {}
