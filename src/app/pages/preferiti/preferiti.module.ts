import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PreferitiComponent } from './preferiti.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    PreferitiComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [PreferitiComponent]
})
export class PreferitiModule { }
