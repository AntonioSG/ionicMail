import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-imagen-usuario',
  templateUrl: './imagen-usuario.component.html',
  styleUrls: ['./imagen-usuario.component.scss']
})
export class ImagenUsuarioComponent implements OnInit {

  // Las propiedades con el decorador Input son propiedades que pueden personalizar
  // este componente, desde fuera del mismo. Son propiedades que "entran" en él.
  @Input('idUsuario') idUsuario: number;
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit () {
    this.usuarioService.getUsuario(this.idUsuario, true).subscribe(datosUsu => {
      this.usuario = datosUsu;
    });
  }
}