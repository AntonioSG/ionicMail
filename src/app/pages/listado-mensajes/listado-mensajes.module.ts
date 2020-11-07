import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoMensajesPageRoutingModule } from './listado-mensajes-routing.module';

import { ListadoMensajesPage } from './listado-mensajes.page';
import { ImagenUsuarioComponent } from '../../components/imagen-usuario/imagen-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoMensajesPageRoutingModule
  ],
  declarations: [ListadoMensajesPage, ImagenUsuarioComponent]
})
export class ListadoMensajesPageModule {}
