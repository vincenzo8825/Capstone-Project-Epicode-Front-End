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
  isUserLoggedIn: boolean = false; // Nuova variabile di stato
  showPassword: boolean = false;
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
          // Imposta il messaggio di errore in base alla risposta del server o un messaggio generico
          this.loginError = err.error?.message || 'Login fallito: Email o Password non corretti.';
          this.isUserLoggedIn = false;
        }
      });
  }

  logout() {
    this.authSvc.logout(); // Aggiungo un metodo logout nel tuo servizio AuthService se non c'è già
    this.isUserLoggedIn = false; // Imposto la variabile di stato a false dopo il logout
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
