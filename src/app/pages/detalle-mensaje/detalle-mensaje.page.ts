import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/interfaces/interfaces';
import {Location} from '@angular/common';
import { MensajeService } from 'src/app/providers/mensaje.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-mensaje',
  templateUrl: './detalle-mensaje.page.html',
  styleUrls: ['./detalle-mensaje.page.scss'],
})
/**
 * Página del Detalle del mensaje
 */
export class DetalleMensajePage implements OnInit {

  mensaje: Mensaje; // Mensaje completo obtenido desde la web API
  tipoMensaje: string; // Texto que corresponde a "Recibidos", "Enviados", etc....

  /**
   * 
   * @param route 
   * @param location 
   * @param mensajeService 
   * @param navCtrl 
   */
  constructor(private route: ActivatedRoute, private location: Location,
    private mensajeService: MensajeService, private navCtrl: NavController) { }

  /**
   * Hook a la inicialización de la página
   */
  ngOnInit() {
    // Con paramMap obtengo los parámetros que se pasan a esta página. Mira el fichero app-routing.module.ts para entender mejor este mapeo
    this.route.paramMap.subscribe(params => {
      var idMensaje = +params.get('id'); // Obtengo el id del mensaje a mostrar
      // Obtengo el mensaje completo, de la web API
      this.mensajeService.getMensaje(idMensaje).subscribe(mensaje => {
        if (mensaje != null) {
          this.mensaje = mensaje; // Cargo el mensaje obtenido en una propiedad de la clase
          // Marco el mensaje como "leído"
          if (this.mensaje != null && !this.mensaje.leido) {
            this.mensajeService.accionSobreMensajes([this.mensaje.id], 0).subscribe(strResult => {});
          }
        }
      })
      // Obtengo el tipo de mensaje: "Recibido", "Enviado", etc....
      this.tipoMensaje = params.get('tipoMensaje')
    });
  }

  /**
   * Volver al listado de mensajes
   */
  volver() {
    this.navCtrl.navigateForward('/listado-mensajes');
  }

  /**
   * Obtener un texto para imprimir una línea de todos los destinatarios de un mensaje
   */
  getTextoDestinatarios () {  
      var str: string = 'Para: ';
      this.mensaje.destinatarios.forEach(function(destinatario, i, destinatarios) {
        str += destinatario.nombre;
        if (i < (destinatarios.length-1)) {
          str += ', '; 
        }
      })
      return str;
  }
}
