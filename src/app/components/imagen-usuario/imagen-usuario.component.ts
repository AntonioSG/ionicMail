import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-imagen-usuario',
  templateUrl: './imagen-usuario.component.html',
  styleUrls: ['./imagen-usuario.component.scss']
})
/**
 * Componente de imagen de usuario
 */
export class ImagenUsuarioComponent implements OnInit {

  // Las propiedades con el decorador Input son propiedades que pueden personalizar
  // este componente, desde fuera del mismo. Son propiedades que "entran" en él.
  @Input('idUsuario') idUsuario: number;
  usuario: Usuario;

  /**
   * 
   * @param usuarioService 
   */
  constructor(private usuarioService: UsuarioService) { }

  /**
   * Hook a la inicialización del componente
   */
  ngOnInit () {
    // Llamada al servicio para obtener datos del usuario
    this.usuarioService.getUsuario(this.idUsuario, true).subscribe(datosUsu => {
      this.usuario = datosUsu;
    });
  }
}