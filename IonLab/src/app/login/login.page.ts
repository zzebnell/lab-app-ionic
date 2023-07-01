import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = "";
  password : string = "";

  constructor(private router : Router, private alertController: AlertController) {
    
  }

  ngOnInit() {
  }

  iniciarSesion = () => {
   localStorage.setItem('Username', this.user);
   localStorage.setItem('Password', this.password);

   if (this.datosVacios()) {
      this.loginVacioAlert()
   }

   else {
      localStorage.setItem('Username', this.user);
      this.router.navigate(['/home']);
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

 datosVacios() {
   return this.user === '' || this.password === '';
 }

}
