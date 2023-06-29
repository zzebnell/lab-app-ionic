import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userName: string = "Leonel Zeballos";
  estado: string = "Activo";

  constructor(private router : Router) {

  }

  mensaje = () => {
    alert("OJO");
  }

  redirMaquinas = () => {
    this.router.navigate(['/maquinas']);
  }

  redirSinMaquinas = () => {
    this.router.navigate(['/']);
  }

}
