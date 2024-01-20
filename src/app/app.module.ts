import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule } from './pages/navbar/navbar.module';
import { FooterModule } from './pages/footer/footer.module';
import { CarrelloModule } from './pages/carrello/carrello.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModule } from './pages/payment/payment.module';
import { CommunityModule } from './pages/community/community.module';
import { TermsAndConditionsModule } from './pages/terms-and-conditions/terms-and-conditions.module';
import { LavoraConNoiModule } from './pages/lavora-con-noi/lavora-con-noi.module';
import { Pagina404Module } from './pages/pagina404/pagina404.module';
import { ProfiloUtenteComponent } from './pages/profilo-utente/profilo-utente.component';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list'; // Aggiunto per le griglie
import { MatExpansionModule } from '@angular/material/expansion'; // Aggiunto per i pannelli espandibili
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    LavoraConNoiModule,
    Pagina404Module,
    // Angular Material Modules
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
