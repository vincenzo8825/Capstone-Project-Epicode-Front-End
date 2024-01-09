import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Per la gestione dei form
import { LavoraConNoiComponent } from './lavora-con-noi.component';

// Importazioni di Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LavoraConNoiComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Aggiungi questo per la gestione dei form
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    // Altri moduli di Angular Material necessari
  ]
})
export class LavoraConNoiModule { }
