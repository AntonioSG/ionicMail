import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonList, NavController } from '@ionic/angular';
import { ListadoMensajes, Mensaje, Usuario} from '../../interfaces/interfaces';
import { MensajeService } from '../../providers/mensaje.service';
import { UsuarioService } from '../../providers/usuario.service';
import { ComunicacionDeAlertasService } from '../../providers/comunicacion-de-alertas.service'; 


@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.page.html',
  styleUrls: ['./listado-mensajes.page.scss'],
})
/**
 * Control de la página para el listado de mensajes
 */
export class ListadoMensajesPage implements OnInit {
  // Utilizo ViewChild para obtener una referencia al control de scroll infinito
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  mensajes: Mensaje[] = []; // En esta variable estarán todos los mensajes representados en el template
  totalMensajes: number =  0; // Número total de mensajes que se podrán cargar.
  tipoListadoMensajes: number = 0; // Indica mensajes recibidos. El código es  0 -> Recibidos  1 -> Enviados
  // 2 -> SPAM    3-> Archivados
  textoTipoMensajes = ""; // Usado para mostrar un texto en la cabecera de la página: "Recibidos", "Enviados", etc...
  paginaACargar = 0; // Página de mensajes a cargar en cada momento.
  mensajesPorPagina = 30; // Cantidad de mensajes a cargar por cada página.

  /**
   * 
   * @param mensajesService 
   * @param comunicacionAlertas 
   * @param navControler 
   */
  constructor(private mensajesService: MensajeService,
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private navControler: NavController) { }

  /**
   * Hook para cargar mensajes en la inicialización del componente
   */
  ngOnInit() {
    this.cargarMensajes();
  }

  /**
   * Carga mensajes, desde el servidor, dentro del array de mensajes
   */
  cargarMensajes() {
    this.comunicacionAlertas.mostrarCargando();
    // Petición de mensajes al servicio
    this.mensajesService.getListadoMensajes(this.tipoListadoMensajes, this.paginaACargar, this.mensajesPorPagina).subscribe(data => {
      this.comunicacionAlertas.ocultarCargando();
      if (data["result"] == "fail") { // Algo ha fallado
        this.comunicacionAlertas.mostrarAlerta("Imposible obtener listado mensajes");
      }
      else { // Todo ha ido bien, se cargan los nuevos mensajes y el número total de mensajes.
        this.totalMensajes = data.totalMensajes;
        data.mensajes.forEach(mensaje => this.mensajes.push(mensaje));
        // La próxima vez que se carguen mensajes se cargará la siguiente "página"
        this.paginaACargar++;
      }
    });
    // Mostramos un título para la página
    this.textoTipoMensajes = this.getTextoTipoMensajes();
  }

  /**
   * Traduzco el tipo de mensajes por un texto.
   */
  getTextoTipoMensajes() {
    switch(this.tipoListadoMensajes) {
      case 0:
        return "Recibidos";
      case 1:
        return "Enviados";
      case 2:
        return "Spam";
      case 3:
        return "Archivados";
    }
  }


  /**
   * En función del tipo de mensaje (recibidos, enviados, etc...) obtiene un texto diferente
   * para la columna del remitente del mensaje
   */
  getTextoRemitente (mensaje: Mensaje) {
    if (this.tipoListadoMensajes == 1) { // Enviados
      var str: string = 'Para: ';
      mensaje.destinatarios.forEach(function(destinatario, i, destinatarios) {
        str += destinatario.nombre;
        if (i < (destinatarios.length-1)) {
          str += ', '; 
        }
      })
      return str;
    }
    else {
      return 'De: ' + mensaje.remitente.nombre
     }
  }


  /**
   * Método ejecutado al hacer click sobre un mensaje de la lista
   * @param mensaje 
   */
  detalleMensaje (mensaje: Mensaje) {
    this.navControler.navigateForward('/detalle-mensaje');
  }


  scrollInfinito(event) {
    setTimeout(() => {
      event.target.complete();

      // Cargo más mensajes en la lista
      this.cargarMensajes();
      // Si la cantidad de mensajes cargados, poco a poco, coincide con el total de mensajes
      // totales a mostrar, deshabilito los futuros eventos de scroll infinito
      if (this.mensajes.length == this.totalMensajes) {
        event.target.disabled = true;
      }
    }, 500); // Retardo de 500 milisegundos antes de cargar más mensajes.
  }


}
