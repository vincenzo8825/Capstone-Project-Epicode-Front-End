import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Aggiungi questa riga
import { Pagina404Component } from './pagina404.component';

@NgModule({
  declarations: [
    Pagina404Component
  ],
  imports: [
    CommonModule,
    RouterModule // Aggiungi RouterModule qui
  ]
})
export class Pagina404Module { }
