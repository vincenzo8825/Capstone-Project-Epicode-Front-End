import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  preferitiCorsi: Corso[] = [];
  preferitiLezioni: Lezione[] = [];
  corsiAcquistati: Corso[] = [];
  lezioniAcquistate: Lezione[] = [];
  attivitaRecenti: any; // Sostituisci con il tipo appropriato
  feedbackUtente: any; // Sostituisci con il tipo appropriato
  subscriptions: Subscription[] = [];
  eventiIscritti: string[] = [];
  eventName!: string;
  showChangePasswordForm = false;
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  constructor(private authService: AuthService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.caricaDatiUtente();
    this.caricaDatiAcquisti();
    this.subscriptions.push(
      this.sharedService.preferitiCorsi$.subscribe(corsi => this.preferitiCorsi = corsi),
      this.sharedService.preferitiLezioni$.subscribe(lezioni => this.preferitiLezioni = lezioni),
      this.sharedService.corsiAcquistati$.subscribe(corsi => this.corsiAcquistati = corsi),
      this.sharedService.lezioniAcquistate$.subscribe(lezioni => this.lezioniAcquistate = lezioni),
      this.sharedService.getEventiIscritti().subscribe(nomiEventi => {
        this.eventiIscritti = nomiEventi;
      })

    );
  }


  caricaDatiUtente(): void {
    const userData = this.authService.getCurrentUser();
    if (userData) {
      this.userName = userData.nome;
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



  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
  }

  cambiaPassword() {
    // Cambia lo stato di showChangePasswordForm da true a false e viceversa
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }
  onSubmit() {
    // Verifica se la password attuale è corretta
    if (this.currentPassword !== 'password') {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Password non modificata, ricontrollare i dati inseriti.'
      });
      return;
    }

    // Verifica se la nuova password e la conferma password sono uguali
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Le password non corrispondono, riprova.'
      });
      return;
    }



    // Mostra il messaggio di successo
    Swal.fire({
      icon: 'success',
      title: 'Successo',
      text: 'Password modificata con successo!'
    });
  }
}


