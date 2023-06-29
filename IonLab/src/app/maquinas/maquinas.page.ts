import { Component, OnInit } from '@angular/core';
import { Maquina } from './Maquina';
import { Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.page.html',
  styleUrls: ['./maquinas.page.scss'],
})
export class MaquinasPage implements OnInit {

  listaMaquinas: Maquina[];
  indicesEnUso: number[];

  constructor(private router : Router, private modalController: ModalController) {
    this.listaMaquinas = [];
    this.indicesEnUso = [2, 5, 10];
  }

  ngOnInit() {
    const storedMaquinas = localStorage.getItem('maquinas');

    for (let i = 0; i < 20; i++) {
      const maquina = new Maquina(this.buscarIndice(this.indicesEnUso, i) , (i < 9) ? `A0${i + 1}` : `A${i + 1}`);
      this.listaMaquinas.push(maquina);
    }

    console.log(this.listaMaquinas);
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
  
  openModal = () => {

  }

}
