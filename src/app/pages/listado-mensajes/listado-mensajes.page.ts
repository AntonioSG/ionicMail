import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, IonList, MenuController, NavController } from '@ionic/angular';
import { ListadoMensajes, Mensaje, Usuario} from '../../interfaces/interfaces';
import { MensajeService } from '../../providers/mensaje.service';
import { UsuarioService } from '../../providers/usuario.service';
import { ComunicacionDeAlertasService } from '../../providers/comunicacion-de-alertas.service'; 
import { NavigationExtras, Router } from '@angular/router';
import { AutenticadorJwtService } from 'src/app/providers/autenticador-jwt.service';


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
  usuarioAutenticado: Usuario; // Usuario autenticado, se obtiene en la inicialización del componente


  /**
   * 
   * @param mensajesService 
   * @param comunicacionAlertas 
   * @param navControler 
   * @param router 
   * @param usuarioService 
   * @param menu 
   * @param autenticacionPorJWT 
   */
  constructor(private mensajesService: MensajeService,
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private navControler: NavController,
    private router: Router, private usuarioService: UsuarioService,
    private actionSheetController: ActionSheetController, 
    private autenticacionPorJWT: AutenticadorJwtService) { }

  /**
   * Hook para cargar mensajes en la inicialización del componente
   */
  ngOnInit() {
    this.cargarMensajes();
    // Cargo el usuario autenticado
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuAutenticado => {
      this.usuarioAutenticado = usuAutenticado;
    })
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
    mensaje.leido = true; // Marco el mensaje actual como leído, ya que se ha abierto
    this.router.navigate(['/detalle-mensaje', mensaje.id, this.getTextoTipoMensajes()]); // Navego hasta listado de mensajes
            // pasándole a la navegación el id del mensaje.
  }

  /**
   * Método llamado con el evento de scroll infinito
   * @param event 
   */
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

  /**
   * Recarga de los mensajes, se llegará aquí tras pulsar una opción del menú lateral
   * @param nuevoTipo 
   */
  recargarListadoMensajes(nuevoTipo: number) {
    this.tipoListadoMensajes = nuevoTipo;
    this.mensajes = [];
    this.paginaACargar = 0;
    this.cargarMensajes();
  }

  /**
   * Cierra la sesión de usuario, se llega aquí tras la correspondiente opción del menú lateral
   */
  cerrarSesion() {
    this.comunicacionAlertas.mostrarConfirmacion("¿Desea cerrar sesión?", () => {
      this.autenticacionPorJWT.eliminaJWT();
      this.navControler.navigateForward('/login'); // Navego hasta el listado de mensajes
    }, () => {
      console.log('cancel');
    });
  }

  /**
   * Método que muestra un componente llamado "action-sheet" para formar un menú que permita
   * navegar entre diferentes tipos de mensajes.
   */
  async mostrarMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menú',
//      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Recibidos',
        icon: 'mail',
        handler: () => {
          this.recargarListadoMensajes(0);
        }
      }, {
        text: 'Enviados',
        icon: 'paper-plane',
        handler: () => {
          this.recargarListadoMensajes(1);
        }
      }, {
        text: 'Spam',
        icon: 'warning',
        handler: () => {
          this.recargarListadoMensajes(2);
        }
      }, {
        text: 'Archivados',
        icon: 'archive',
        handler: () => {
          this.recargarListadoMensajes(3);
        }
      }, {
        text: 'Cerrar sesión',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.cerrarSesion();
        }
      }]
    });
    await actionSheet.present();
  }

}
