import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'listado-mensajes',
    loadChildren: () => import('./pages/listado-mensajes/listado-mensajes.module').then( m => m.ListadoMensajesPageModule)
  },
  {
    path: 'detalle-mensaje',
    loadChildren: () => import('./pages/detalle-mensaje/detalle-mensaje.module').then( m => m.DetalleMensajePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
