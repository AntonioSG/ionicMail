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


  constructor(private usuarioService: UsuarioService, private router: Router,
    private autenticadorJwtService: AutenticadorJwtService,
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private navControler: NavController) { }

  ngOnInit() {
        // Inicializo el objeto FormGroup, es la base para usar formularios reactivos, en los que la validación
    // y el control son muy fáciles de realizar.
    this.loginForm = new FormGroup({
      usuario: new FormControl ('rafa', [Validators.required, Validators.minLength(4)]),
      password: new FormControl ('1234', [Validators.required])
    });
  }


  autenticaUsuario () {
    this.waiting = true;
    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value, 
      this.loginForm.controls.password.value).subscribe(data => {
        console.log(data);
        this.waiting = false;  
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt); // Almaceno un nuevo JWT
          this.navControler.navigateForward('/listado-mensajes');
        } 
        else {
          this.comunicacionAlertas.mostrarAlerta("Usuario y/o password incorrectos");
        }
      });
  }

}
