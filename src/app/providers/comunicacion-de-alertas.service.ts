import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

// Este servicio se utiliza para controlar un componente denominado "dialogo-general".
// Mediante los métodos de este servicio controlaremos que se abra en pantalla un dialogo
// que muestre información, errores, progreso o confirmación de alguna información.
// Además también se incorpora un método para cerrar el dialogo en cualquier momento
export class ComunicacionDeAlertasService {

  isLoading = false; // Permite que esta clase sepa si se está mostrando el diálogo de carga o no


  // Necesito un componente de tipo MatDialog (de Angular) para mostrar en pantalla un diálogo
  constructor(public alertController: AlertController,
    private loadingController: LoadingController){}

  /**
   * Método que permite mostrar, en Ionic, un cuadro de diálogo de alerta.
   * @param infoText 
   */
  async mostrarAlerta(infoText: string) {
    const alert = await this.alertController.create({
//      cssClass: 'my-custom-class',
//      header: 'Alert',
//      subHeader: 'Subtitle',
      message: infoText,
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  /**
   * Método para mostrar un pequeño diálogo de carga, una animación
   */
  async mostrarCargando() {
    this.isLoading = true; // El diálogo se muestra si la variable está a true. Esta
    // variable domina el diálogo de carga.
    return await this.loadingController.create({
      // duration: 5000,  // Si queremos una duración fija del diálogo, descomentas esta línea
    }).then(a => { // Una vez que el diálogo se crea, se muestra, con el método "present"
      a.present().then(() => {
        if (!this.isLoading) { // Cuando la variable "isLoading" se anule, cerramos el diálogo
          a.dismiss().then(() => {}); // Cerramos el diálogo
        }
      });
    });
  }

  /**
   * Para cerrar un diálogo de carga simplemente ponemos la variable a false
   */
  async ocultarCargando() {
    this.isLoading = false;
    // Podemos intervenir desde aquí en el momento del cierre del diálogo, método "dismiss"
    return await this.loadingController.dismiss().then(() => {});
  }


}
