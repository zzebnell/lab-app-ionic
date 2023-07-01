import { Component, OnInit } from '@angular/core';
import { Usuario } from './Usuario';
import { AlertController, AlertInput } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sin-maquinas',
  templateUrl: './sin-maquinas.page.html',
  styleUrls: ['./sin-maquinas.page.scss'],
})
export class SinMaquinasPage implements OnInit {

  listaUsuariosSM!: Usuario[];
  username: any = localStorage.getItem('Username');

  public alertButtons = ['Registrar'];
  public alertInputs: AlertInput[] = [
    {
      name: 'nombre',
      placeholder: 'Nombre',
    },
    {
      name: 'carnet',
      placeholder: 'Carnet',
      type: 'number',
      attributes: {
        maxlength: 8,
      },
    },
    {
      name: 'hora',
      placeholder: 'Hora',
    },
  ];

  constructor(private alertController: AlertController, private router: Router) {
    this.listaUsuariosSM = [];
  }

  ngOnInit() {

   this.cargarEstudiantesLocalStorage();
   console.log(this.listaUsuariosSM.length)
    /*for (let  i = 0; i < 10; i++) {
      this.registrarUsuario('Leonel', '14095629', '9:45');
    }*/

    console.log(this.listaUsuariosSM);
  }

  redirHome() {
   this.router.navigate(['/home']);
  }

  redirMaquinas() {
   this.router.navigate(['/maquinas']);
  }

  registrarEstudiantesStorage() {
   const estudiantesJSON = JSON.stringify(this.listaUsuariosSM);
   localStorage.setItem('ESTUDIANTES', estudiantesJSON);
  }

  cargarEstudiantesLocalStorage() {
   const estudiantesJSON = localStorage.getItem('ESTUDIANTES');
   if (estudiantesJSON) {
      this.listaUsuariosSM = JSON.parse(estudiantesJSON);
   }
  }

  actualizarUsuario(usuario:Usuario, nombre: string, ci: string, hora: string) {
    usuario.nombre = nombre;
    usuario.ci = ci;
    usuario.hora = hora;
  }

  registrarUsuario(nombre: string, ci: string, hora: string) {
    const usuario = new Usuario(nombre, ci, hora);

    this.listaUsuariosSM.push(usuario); // Anadimos un usuario a la lista
    this.registrarEstudiantesStorage(); // Almacenaje local
  }

  eliminarUsuario(usuario: Usuario) {
    const index = this.listaUsuariosSM.indexOf(usuario);

    this.listaUsuariosSM.splice(index, 1);
    this.registrarEstudiantesStorage();
  }

  async presentAlert() { // Boton de registro
    this.alertInputs[0].value = '';
    this.alertInputs[1].value = '';
    this.alertInputs[2].value = '';

    const alert = await this.alertController.create({
      header: 'Registrar',
      inputs: this.alertInputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Datos ingresados:', data);
            const nombre = data.nombre;
            const carnet = data.carnet;
            const hora = data.hora;
            if (nombre === '' || carnet === '' || hora === '') {
              this.incompleteDataAlert()
            }
            else {
              this.registrarUsuario(nombre, carnet, hora);
            }
            console.log(this.listaUsuariosSM)
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarDatos(usuario: Usuario) {

    this.alertInputs[0].value = usuario.nombre;
    this.alertInputs[1].value = usuario.ci;
    this.alertInputs[2].value = usuario.hora;

    const beforeNombre = usuario.nombre;
    const beforeCI = usuario.ci;
    const beforeHora = usuario.hora;

    console.log(usuario)

    const alert = await this.alertController.create({
      header: `${usuario.nombre}`,
      inputs: this.alertInputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Finalizar',
          handler: () => {

            this.eliminarUsuarioAlert(usuario);
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Datos ingresados:', data);
            const nombre = data.nombre;
            const carnet = data.carnet;
            const hora = data.hora;

            if (beforeNombre !== nombre || beforeCI !== carnet || beforeHora !== hora) {
              this.actualizarDatosAlert(usuario, nombre, carnet, hora);
            }

            console.log(this.listaUsuariosSM)
          }
        }
      ]
    });

    await alert.present();
  }

  async incompleteDataAlert() {

    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Estudiante no registrado',
      message: 'Por favor rellene todos los campos para realizar el registro',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async actualizarDatosAlert(usuario: Usuario, nombre: string, carnet: string, hora: string) {

    const alert = await this.alertController.create({
      header: 'Acualizar Datos',
      subHeader: '',
      message: 'Guardar cambios realizados',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.actualizarUsuario(usuario, nombre, carnet, hora)
            console.log('Datos actualizados');
            console.log(this.listaUsuariosSM)
            this.registrarEstudiantesStorage();
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarUsuarioAlert(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Finalizar',
      subHeader: '',
      message: 'Esta seguro que desea finalizar la estadia del estudiante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.eliminarUsuario(usuario)
          }
        }
      ]
    });

    await alert.present();
  }

}
