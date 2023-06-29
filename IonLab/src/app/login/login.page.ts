import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = "";
  password : string = "";

  constructor(private router : Router) {
    
  }

  ngOnInit() {
  }

  iniciarSesion = () => {
    console.log(this.user.length);

    this.router.navigate(['/home']);
  }

}
