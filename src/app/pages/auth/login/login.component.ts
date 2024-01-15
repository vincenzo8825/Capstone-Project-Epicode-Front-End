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
  loginError: string = '';
  isUserLoggedIn: boolean = false;
  mostraPassword: boolean = false; // Variabile per gestire la visibilità della password

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  loginData: iLogin = {
    email: '',
    password: ''
  }

  save() {
    this.authSvc.login(this.loginData)
      .subscribe({
        next: (data) => {
          this.isUserLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loginError = err.error?.message || 'Login fallito: Email o Password non corretti.';
          this.isUserLoggedIn = false;
        }
      });
  }

  logout() {
    this.authSvc.logout();
    this.isUserLoggedIn = false;
  }

  cambiaVisibilitaPassword() {
    this.mostraPassword = !this.mostraPassword; // Cambia lo stato della variabile per mostrare/nascondere la password
  }
}
