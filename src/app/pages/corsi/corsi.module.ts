
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CorsiComponent } from './corsi.component';

import { PreferitiModule } from '../preferiti/preferiti.module';
import { LezioniModule } from '../lezioni/lezioni.module';

@NgModule({
  declarations: [
    CorsiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PreferitiModule,
    LezioniModule,
  ],
  exports: [CorsiComponent]
})
export class CorsiModule { }
