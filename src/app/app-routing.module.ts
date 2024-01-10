// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarrelloComponent } from './pages/carrello/carrello.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { PreferitiComponent } from './pages/preferiti/preferiti.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CommunityComponent } from './pages/community/community.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LavoraConNoiComponent } from './pages/lavora-con-noi/lavora-con-noi.component';
import { ProfiloUtenteComponent } from './pages/profilo-utente/profilo-utente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'chi-siamo', loadChildren: () => import('./pages/chi-siamo/chi-siamo.module').then(m => m.ChiSiamoModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'community', component: CommunityComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: 'preferiti', component: PreferitiComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment', component: PaymentComponent, data: { state: 'payment' } },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {path:'lavora-con-noi', component: LavoraConNoiComponent},
  { path: 'profilo-utente', component: ProfiloUtenteComponent },
  // Altre route possono essere aggiunte qui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
