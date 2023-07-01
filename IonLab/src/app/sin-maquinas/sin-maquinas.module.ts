import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinMaquinasPageRoutingModule } from './sin-maquinas-routing.module';

import { SinMaquinasPage } from './sin-maquinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinMaquinasPageRoutingModule
  ],
  declarations: [SinMaquinasPage]
})
export class SinMaquinasPageModule {}
