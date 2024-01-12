import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule } from './pages/navbar/navbar.module';
import { FooterModule } from './pages/footer/footer.module';
import { CarrelloModule } from './pages/carrello/carrello.module'; // Importa il modulo Carrello
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModule } from './pages/payment/payment.module';
import { CommunityModule } from './pages/community/community.module';
import { TermsAndConditionsModule } from './pages/terms-and-conditions/terms-and-conditions.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LavoraConNoiModule } from './pages/lavora-con-noi/lavora-con-noi.module';
import { ProfiloUtenteComponent } from './pages/profilo-utente/profilo-utente.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    ProfiloUtenteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    CarrelloModule,
    FormsModule,
    BrowserAnimationsModule,
    PaymentModule,
    CommunityModule,
    TermsAndConditionsModule,
    MatToolbarModule,
    MatIconModule,
    LavoraConNoiModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
