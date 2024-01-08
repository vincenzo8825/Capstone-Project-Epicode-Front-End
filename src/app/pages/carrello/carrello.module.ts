// carrello.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrelloComponent } from './carrello.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CarrelloComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [CarrelloComponent]  // Assicurati di esportare il componente
})
export class CarrelloModule {}
