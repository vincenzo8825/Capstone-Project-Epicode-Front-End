import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa i moduli Angular Material necessari
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; // Aggiunto per i tabs
import { MatToolbarModule } from '@angular/material/toolbar'; // Aggiunto per la toolbar
import { MatCardModule } from '@angular/material/card';
import { CorsiModule } from '../corsi/corsi.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PreferitiModule } from '../preferiti/preferiti.module';
import { LezioniModule } from '../lezioni/lezioni.module';

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
    MatTabsModule, // Assicurati di includere il modulo qui
    MatToolbarModule, // Assicurati di includere il modulo qui
    CorsiModule,
    MatCardModule
  ],
})
export class DashboardModule {}
