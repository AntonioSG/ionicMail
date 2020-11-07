import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMensajePageRoutingModule } from './detalle-mensaje-routing.module';

import { DetalleMensajePage } from './detalle-mensaje.page';
import { ImagenUsuarioComponent } from 'src/app/components/imagen-usuario/imagen-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMensajePageRoutingModule
  ],
  declarations: [DetalleMensajePage, ImagenUsuarioComponent]
})
export class DetalleMensajePageModule {}
