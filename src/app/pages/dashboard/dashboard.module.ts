// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CorsiModule } from '../corsi/corsi.module'; // Assicurati d
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PreferitiModule } from '../preferiti/preferiti.module';
import { LezioniModule } from '../lezioni/lezioni.module'; // Assicurati di fornire il percorso corretto

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    PreferitiModule,
    LezioniModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CorsiModule
  ],
})
export class DashboardModule {}
