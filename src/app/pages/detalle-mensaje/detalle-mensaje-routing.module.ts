import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMensajePage } from './detalle-mensaje.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMensajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMensajePageRoutingModule {}
