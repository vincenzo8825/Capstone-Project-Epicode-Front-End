
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LezioniComponent } from './lezioni.component';

@NgModule({
  declarations: [
    LezioniComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule

  ],
  exports: [
    LezioniComponent
  ]
})
export class LezioniModule { }
