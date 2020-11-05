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

}
