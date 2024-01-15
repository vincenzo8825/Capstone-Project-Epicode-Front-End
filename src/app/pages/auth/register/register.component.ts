import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iRegister } from '../Models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  registerData:iRegister = {
    email: '',
    password: '',
    nome: '',
    cognome: '',
  }

  showPassword: boolean = false;

  save(){
    this.authSvc.signUp(this.registerData)
    .subscribe(data => {
        this.router.navigate(['/auth/login'])
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
