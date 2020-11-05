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


  // Necesito un componente de tipo MatDialog (de Angular) para mostrar en pantalla un diálogo
  constructor(public alertController: AlertController,
    private loadingController: LoadingController){}

  /**
   * Dialogo para mostrar una pequeña animación, basada en el componente de angular "Progress Spinner"
  */ 
/*  abrirDialogCargando() {
    this.cerrarDialogo(); // Si existe un diálogo en pantalla, lo cierra
    this.dialogConfig.data = {
      tipoDialogo: DialogTypes.ESPERANDO // Especifica un tipo de dialogo, creado por mí
    };
    this.dialog.open(DialogoGeneralComponent, this.dialogConfig); // abre el diálogo
  }*/

  async presentAlert(infoText: string) {
    const alert = await this.alertController.create({
//      cssClass: 'my-custom-class',
//      header: 'Alert',
//      subHeader: 'Subtitle',
      message: infoText,
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  async presentAlertConfirm(confirmText: string, okFunction: Function, cancelFunction: Function) {
    const alert = await this.alertController.create({
//      cssClass: 'my-custom-class',
//      header: 'Confirm!',
      message: confirmText,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            cancelFunction();
          }
        }, {
          text: 'Sí',
          handler: () => {
            okFunction();
          }
        }
      ]
    });

    await alert.present();
  }





  isLoading = false;
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  /**
   * Diálogo para mostrar un mensaje de error en pantalla
   */
/*  abrirDialogError(textoDeError: string) {
    this.cerrarDialogo(); // Cierro el diálogo, si se está mostrando
    this.dialogConfig.data = {
      tipoDialogo: DialogTypes.ERROR, // Configuro un tipo de error, creado por mí
      texto: textoDeError 
    };
    this.dialog.open(DialogoGeneralComponent, this.dialogConfig); // abro el diálogo
  }*/

  /**
   * Diálogo para mostrar una información en pantalla. El método devuelve un observable que
   * permite que sepamos en qué momento se cierra el diálogo. Esto es útil para mostrar un texto
   * y, por ejemplo, no avanzar hasta otra página mientras el diálogo esté en pantalla.
   */
/*  abrirDialogInfo(textoDeInfo: string): Observable<number> {
    this.cerrarDialogo();
    this.dialogConfig.data = {  
      tipoDialogo: DialogTypes.INFORMACION,
      texto: textoDeInfo
    };
    // Abro el diálogo pero obtengo una referencia al mismo.
    const dialogRef = this.dialog.open(DialogoGeneralComponent, this.dialogConfig);
    // Devuelvo el evento "afterClosed", que permite subscripción
    return dialogRef.afterClosed();
  }*/

  /**
   * Abro un diálogo para confirmar un mensaje al usuario. Podrá elegir entre diferentes
   * opciones. El método devuelve un Observable, para saber qué opción se ha elegido.
   */
/*  abrirDialogConfirmacion (textoDeConfirmacion: string): Observable<number> {
    this.cerrarDialogo();
    this.dialogConfig.data = {
      tipoDialogo: DialogTypes.CONFIRMACION,
      texto: textoDeConfirmacion
    };
    // Al igual que el método anterior, obtengo una referencia al diálogo abierto para poder
    // devolver un Observable al que subscribirnos
    const dialogRef = this.dialog.open(DialogoGeneralComponent, this.dialogConfig);
    return dialogRef.afterClosed();
  }*/

  /**
   * 
   */
/*  cerrarDialogo() {
    this.dialog.closeAll();
  }*/


  /**
   * Muestra un pequeño cartel de información, que dura 2 segundos en pantalla
   */
/*  mostrarSnackBar(mensajeAMostrar: string) {
    this.snackBar.open(mensajeAMostrar, null, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }*/

}
