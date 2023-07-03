import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertInput } from '@ionic/angular';
import { Adh } from './Adh';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = "";
  password : string = "";

  listaCuentas!: Adh[];

  constructor(private router : Router, private alertController: AlertController) {
    this.listaCuentas = [new Adh('Leonel', '12345'), new Adh('admin', 'admin')];
  }

  ngOnInit() {
   if (localStorage.getItem('Logged') === 'true') {
      this.router.navigate(['/home']);
   }
  }

  iniciarSesion = () => {
   const cuenta = new Adh(this.user, this.password);

   if (this.validarUsuario(cuenta)) {
      localStorage.setItem('Username', this.user);
      localStorage.setItem('Password', this.password);

      localStorage.setItem('Logged', 'true'); // Pendiente
      this.router.navigate(['/home']);

   }

   else if (this.datosVacios()) {
      this.loginVacioAlert()
   }

   else {
      this.datosIncorrectosAlert();
   }

  }

  async loginVacioAlert() {
   const alert = await this.alertController.create({
     header: 'Campos vacios',
     subHeader: '',
     message: '',
     buttons: ['OK']
   });

   await alert.present();
 }

 async datosIncorrectosAlert() {
   const alert = await this.alertController.create({
     header: 'Datos incorrectos',
     subHeader: '',
     message: '',
     buttons: ['OK']
   });

   await alert.present();
 }

 datosVacios() {
   return this.user === '' || this.password === '';
 }

 validarUsuario(cuenta: Adh) {
   for (let i = 0; i < this.listaCuentas.length; i++) {
      if (this.listaCuentas[i].usuario === cuenta.usuario && this.listaCuentas[i].password === cuenta.password) {
         return true;
      }
   }
   return false;
 }

}
