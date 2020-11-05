import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/usuario.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from '../../providers/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from '../../providers/comunicacion-de-alertas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  waiting: boolean = false;
  loginForm: FormGroup; // Permite tener un objeto linkado a los campos del formulario de autenticación

  /**
   * Constructor
   * @param usuarioService 
   * @param router 
   * @param autenticadorJwtService 
   * @param comunicacionAlertas 
   * @param navControler 
   */
  constructor(private usuarioService: UsuarioService, private router: Router,
    private autenticadorJwtService: AutenticadorJwtService,
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private navControler: NavController) { }

  /**
   * Hook al inicio del componente, sólo inicializo el formulario reactivo
   */
  ngOnInit() {
    // Inicializo el objeto FormGroup, es la base para usar formularios reactivos, en los que la validación
    // y el control son muy fáciles de realizar.
    this.loginForm = new FormGroup({
      usuario: new FormControl('rafa', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('1234', [Validators.required])
    });
  }


  /**
   * Método que llama al servicio de los usuarios para autenticar los campos escritos en el formulario
   */
  autenticaUsuario() {
    this.waiting = true; // Para mostrar el "loading" del botón del formulario
    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).then(data => {
        this.waiting = false;
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt); // Almaceno un nuevo JWT
          this.navControler.navigateForward('/listado-mensajes'); // Navego hasta el listado de mensajes
        }
        else {
          this.comunicacionAlertas.mostrarAlerta("Usuario y/o password incorrectos");
        }
      }).catch(error => { // Se ha producido algún tipo de error en el acceso al servidor o el servidor ha devuelto un error.
        this.waiting = false;
        this.comunicacionAlertas.mostrarAlerta('Error en acceso al servidor');
      });


  }

}
