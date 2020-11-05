import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoMensajesPageRoutingModule } from './listado-mensajes-routing.module';

import { ListadoMensajesPage } from './listado-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoMensajesPageRoutingModule
  ],
  declarations: [ListadoMensajesPage]
})
export class ListadoMensajesPageModule {}
