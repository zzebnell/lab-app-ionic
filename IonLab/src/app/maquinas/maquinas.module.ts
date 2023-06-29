import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinasPageRoutingModule } from './maquinas-routing.module';

import { MaquinasPage } from './maquinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinasPageRoutingModule
  ],
  declarations: [MaquinasPage]
})
export class MaquinasPageModule {}
