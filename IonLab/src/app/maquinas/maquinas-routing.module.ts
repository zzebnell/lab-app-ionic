import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinasPage } from './maquinas.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinasPageRoutingModule {}
