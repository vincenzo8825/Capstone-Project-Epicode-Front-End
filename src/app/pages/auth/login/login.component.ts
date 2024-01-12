import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iLogin } from '../Models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isUserLoggedIn: boolean = false; // Nuova variabile di stato

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  loginData: iLogin = {
    email: 'mario@rossi.it',
    password: 'password'
  }

  save() {
    this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.isUserLoggedIn = true; // Imposto la variabile di stato a true dopo il login
        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
    this.authSvc.logout(); // Aggiungo un metodo logout nel tuo servizio AuthService se non c'è già
    this.isUserLoggedIn = false; // Imposto la variabile di stato a false dopo il logout
  }

}
