// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LezioniComponent } from '../lezioni/lezioni.component'; // Importa il componente delle lezioni
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'preferiti', loadChildren: () => import('../preferiti/preferiti.module').then(m => m.PreferitiModule) },
      { path: 'lezione/:id', component: LezioniComponent },
      // ... altri percorsi specifici della dashboard ...
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
