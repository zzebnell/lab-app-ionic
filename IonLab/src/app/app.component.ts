import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss'],
})
export class AppComponent {
   username: any = localStorage.getItem('Username');

   constructor(private router: Router) { }

   cambiarLogged() {
      localStorage.setItem('Logged', 'false');
   }

   redirLogin() {
      if (localStorage.getItem('Logged') === 'false') {
         this.router.navigate(['/login']);
      }
   }

}
