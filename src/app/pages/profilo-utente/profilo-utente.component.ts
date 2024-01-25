import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { SharedService } from '../../shared.service';
import { Corso } from './../corsi/corso';
import { Lezione } from './../lezioni/lezione';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.scss']
})
export class ProfiloUtenteComponent implements OnInit, OnDestroy {
  userName: string | null = null;
  userEmail: string | null = null;
  userCognome: string | null = null;
  preferitiCorsi: Corso[] = [];
  preferitiLezioni: Lezione[] = [];
  corsiAcquistati: Corso[] = [];
  lezioniAcquistate: Lezione[] = [];
  eventiIscritti: string[] = [];
  iscrizioni: { [nomeEvento: string]: boolean; };
  appuntamenti: { professore: string, orario: string }[] = [];

  showChangePasswordForm = false;
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  isSettingsFormVisible: boolean = false;
  private unsubscribe$ = new Subject<void>();
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.iscrizioni = {}; // Inizializza la variabile iscrizioni come un oggetto vuoto nel costruttore
  }

  ngOnInit(): void {
    this.caricaDatiUtente();
    this.caricaDatiAcquisti();
    this.caricaEventiIscritti();
    this.subscriptions.push(
      this.sharedService.appuntamenti$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(appuntamenti => {
          this.appuntamenti = appuntamenti;
        })
    );
    this.subscriptions.push(
      this.sharedService.preferitiCorsi$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(corsi => this.preferitiCorsi = corsi),

      this.sharedService.preferitiLezioni$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(lezioni => this.preferitiLezioni = lezioni),

      this.sharedService.corsiAcquistati$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(corsi => this.corsiAcquistati = corsi),

      this.sharedService.lezioniAcquistate$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(lezioni => this.lezioniAcquistate = lezioni),

      this.sharedService.getEventiIscritti()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(nomiEventi => this.eventiIscritti = nomiEventi)
    );
  }
  openChangePasswordDialog() {
    this.showChangePasswordForm = true; // Apri il form di cambio password
  }
  caricaDatiUtente(): void {
    const userData = this.authService.getCurrentUser();
    if (userData) {
      this.userName = userData.nome;
      this.userCognome = userData.cognome;
      this.userEmail = userData.email;
    }
  }

  caricaDatiAcquisti(): void {
    const datiAcquistiRaw = localStorage.getItem('datiAcquisti');
    if (datiAcquistiRaw) {
      const datiAcquisti = JSON.parse(datiAcquistiRaw);
      this.sharedService.sincronizzaDatiAcquistiConSubject(datiAcquisti.carrelloCorsi, datiAcquisti.carrelloLezioni);
    }
  }

  caricaEventiIscritti(): void {
    const eventiIscrittiStorage = JSON.parse(localStorage.getItem('eventiIscritti') || '{}') as { [nomeEvento: string]: boolean };
    this.eventiIscritti = Object.keys(eventiIscrittiStorage).filter(nomeEvento => eventiIscrittiStorage[nomeEvento]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(): void {
    this.authService.logout();
  }

  cambiaPassword() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }
  toggleSettingsForm() {
    this.isSettingsFormVisible = !this.isSettingsFormVisible;
  }
  onSubmit() {
    // Qui inserisco la logica per cambiare la password.

    if (this.currentPassword !== 'password') {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Password attuale non corretta.'
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Le password non corrispondono.'
      });
      return;
    }

    // Qui assumiamo che la password sia stata cambiata con successo
    Swal.fire({
      icon: 'success',
      title: 'Successo',
      text: 'Password modificata con successo!'
    });
  }
}
