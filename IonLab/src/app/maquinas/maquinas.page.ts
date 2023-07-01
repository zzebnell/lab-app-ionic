import { Component, OnInit, ViewChild } from '@angular/core';
import { Maquina } from './Maquina';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.page.html',
  styleUrls: ['./maquinas.page.scss'],
  template: `<ion-input [value]="datosRegistro"></ion-input>
             <ion-icon [color]="enUso"</ion-icon>`,
})
export class MaquinasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonInput) input!: IonInput;

  isAlertOpen = false;
  public alertButtons = ['OK'];

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  nroMaquina!: string;
  mensajeEstadoUso!: string;
  registroNombre!: string;
  registroCI!: string;
  registroHora!: string;
  enUso!: string;
  datosGlobalesMaquina!: Maquina;
  haFinalizado: boolean = true;

  username: any = localStorage.getItem('Username');

  beforeUser!: string;
  beforeCI!: string;
  beforeHour!: string;

  partialName: string = "";
  partialCI: string = "";
  partialHora: string = "";

  listaMaquinas: Maquina[];

  constructor(private router: Router, private alertController: AlertController) {
    this.listaMaquinas = [];
  }

  ngOnInit() {

    for (let i = 0; i < 20; i++) {
      const maquina = new Maquina(false, (i < 9) ? `A0${i + 1}` : `A${i + 1}`);

      this.listaMaquinas.push(maquina);
    }

    this.cargarMaquinasDesdeLocalStorage();
    console.log(this.listaMaquinas)

  }

  registrarMaquinaStorage(maquina: Maquina) {
    //localStorage.setItem('MaquinaData', JSON.stringify(maquina));
    this.guardarMaquinasEnLocalStorage();
  }

  guardarMaquinasEnLocalStorage() {
    const maquinasJSON = JSON.stringify(this.listaMaquinas);
    localStorage.setItem('MAQUINAS', maquinasJSON);
  }

  cargarMaquinasDesdeLocalStorage() {
    const maquinasJSON = localStorage.getItem('MAQUINAS');
    if (maquinasJSON) {
      this.listaMaquinas = JSON.parse(maquinasJSON) as Maquina[];
    }
  }

  async presentAlert() { // Alertas al presionar el boton de registrar o finalizar
    if (this.mensajeEstadoUso === "Registrar" && this.inputsVacios()) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Maquina no registrada',
        message: 'Porfavor rellene todos los campos para realizar el registro',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }

    else if (this.mensajeEstadoUso === "Registrar" && !this.inputsVacios()) {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        subHeader: '',
        message: `Maquina ${this.nroMaquina} registrada exitosamente`,
        buttons: ['Aceptar'],
      });

      this.modal.dismiss(this.name, 'confirm');
      await alert.present();
    }
  }

  buscarIndice = (arreglo: number[], entero: number) => {
    let esta = false;
    let k;

    for (k in arreglo) {
      if (arreglo[k] === entero) {
        esta = true;
        break;
      }
    }

    return esta;
  }

  redirSinMaquinas() {
   this.router.navigate(['/sin-maquinas']);
  }

  redirHome() {
   this.router.navigate(['/home']);
  }

  cancel(nro: string) {
    let k;
    let maquina = new Maquina(true, "");

    for (k in this.listaMaquinas) {
      if (this.listaMaquinas[k].nombre === nro) {
        maquina = this.listaMaquinas[k];
        break;
      }
    }

    if ((this.beforeUser !== this.partialName || this.beforeCI !== this.partialCI || this.beforeHour !== this.partialHora) && this.mensajeEstadoUso === 'Finalizar') {
      this.actualizarDatosAlert(maquina);
    }
    
    else {
      this.modal.dismiss(null, 'cancel');
    }
  }

  confirm(nro: string) {
    let k;
    let maquina = new Maquina(true, "");

    for (k in this.listaMaquinas) {
      if (this.listaMaquinas[k].nombre === nro) {
        maquina = this.listaMaquinas[k];
        break;
      }
    }

    if (this.mensajeEstadoUso === "Registrar" && !this.inputsVacios()) {
      this.registrarAlert(maquina);
    }

    else if (this.mensajeEstadoUso === "Finalizar") {

      this.finalizarAlert(maquina)
    }

    else if (this.mensajeEstadoUso === "Registrar" && this.inputsVacios()) {
      this.datosIncompletosAlert(maquina);
    }

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'cancel') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  openModal(maquinaSel: Maquina) {

    this.beforeUser = maquinaSel.usuario;
    this.beforeCI = maquinaSel.usuarioCI;
    this.beforeHour = maquinaSel.usuarioHora;

    this.registroNombre = maquinaSel.usuario;
    this.partialName = this.registroNombre;

    this.registroCI = maquinaSel.usuarioCI;
    this.partialCI = this.registroCI;

    this.registroHora = maquinaSel.usuarioHora;
    this.partialHora = this.registroHora;

    console.log('Maquina ' + maquinaSel.nombre + ": " + maquinaSel.usuario)

    console.log(maquinaSel);

    if (maquinaSel.ocupada === false) { // Maquina libre
      this.enUso = "success"; // Color del ciculo de estado de uso
      this.mensajeEstadoUso = "Registrar";
      //this.modAtributos();
    }
    else { // Maquina en uso
      this.registroNombre = maquinaSel.usuario; // TODO
      this.enUso = "danger";
      this.mensajeEstadoUso = "Finalizar";
    }

    this.nroMaquina = maquinaSel.nombre; // Titulo del modal
    this.modal.present();
  }

  inputsVacios = () => {
    let in1 = this.partialName;
    let in2 = this.partialCI;
    let in3 = this.partialHora;

    return in1 === '' || in2 === '' || in3 === ''
  }

  async finalizarAlert(maquina: Maquina) {

    const alert = await this.alertController.create({
      header: 'Finalizar',
      subHeader: '',
      message: 'Finalizar el turno',
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
            maquina.usuario = "";
            maquina.usuarioCI = "";
            maquina.usuarioHora = "";

            maquina.ocupada = false;
            this.guardarMaquinasEnLocalStorage();
            this.modal.dismiss(null, 'cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async registrarAlert(maquina: Maquina) {

    const alert = await this.alertController.create({
      header: 'Registro',
      subHeader: 'Realizar el registro',
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
            maquina.usuario = this.partialName;
            maquina.usuarioCI = this.partialCI;
            maquina.usuarioHora = this.partialHora;

            maquina.ocupada = true;
            this.modal.dismiss(null, 'cancel');
            this.registrarMaquinaStorage(maquina);
            console.log('Maquina registrada!');
          }
        }
      ]
    });

    await alert.present();
  }

  async datosIncompletosAlert(maquina: Maquina) {

    const alert = await this.alertController.create({
      header: 'Datos incompletos',
      subHeader: '',
      message: 'Por favor rellene todos los campos para registrar',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async actualizarDatosAlert(maquina: Maquina) {

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
            this.modal.dismiss(null, 'cancel');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            maquina.usuario = this.partialName;
            maquina.usuarioCI = this.partialCI;
            maquina.usuarioHora = this.partialHora;

            this.modal.dismiss(null, 'cancel');
            this.registrarMaquinaStorage(maquina);
          }
        }
      ]
    });

    await alert.present();
  }

}