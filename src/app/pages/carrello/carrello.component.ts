import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from './../corsi/corso';
import { Lezione } from './../lezioni/lezione';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnDestroy {
  carrelloCorsi: Corso[] = [];
  private corsoSubscription: Subscription;

  carrelloLezioni: Lezione[] = [];
  private lezioneSubscription: Subscription;

  mostraSezionePagamento = false;
  totaleGenerale: number = 0;
  confermaPagamento: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) {
    this.corsoSubscription = this.sharedService.carrelloCorsi$.subscribe((carrelloCorsi) => {
      this.carrelloCorsi = carrelloCorsi;
      this.calcolaTotaleGenerale();
    });

    this.lezioneSubscription = this.sharedService.carrelloLezioni$.subscribe((carrelloLezioni) => {
      this.carrelloLezioni = carrelloLezioni;
      this.calcolaTotaleGenerale();
    });
  }

  ngOnDestroy(): void {
    this.corsoSubscription.unsubscribe();
    this.lezioneSubscription.unsubscribe();
  }

  aggiungiAlCarrelloCorso(corso: Corso): void {
    console.log('Aggiungi al carrello corso:', corso);
    this.sharedService.aggiungiAlCarrelloCorso(corso);
  }

  rimuoviDalCarrelloCorso(corso: Corso): void {
    console.log('Rimuovi dal carrello corso:', corso);
    this.sharedService.rimuoviDalCarrelloCorso(corso);
  }

  aggiungiAlCarrelloLezione(lezione: Lezione): void {
    console.log('Aggiungi al carrello lezione:', lezione);
    this.sharedService.aggiungiAlCarrelloLezione(lezione);
  }

  rimuoviDalCarrelloLezione(lezione: Lezione): void {
    console.log('Rimuovi dal carrello lezione:', lezione);
    this.sharedService.rimuoviDalCarrelloLezione(lezione);
  }

  calcolaTotaleGenerale(): void {
    const totaleCorsi = this.calcolaTotaleCorsi();

    this.totaleGenerale = parseFloat(totaleCorsi.toFixed(2));

    // Aggiorna il totale generale nello shared service
    this.sharedService.updateTotaleGenerale(this.totaleGenerale);
  }


  calcolaTotaleCorsi(): number {
    const totaleCorsi = this.carrelloCorsi.reduce((acc, corso) => {
      const prezzoNumerico = typeof corso.prezzo === 'number' ? corso.prezzo : parseFloat(corso.prezzo);
      return acc + prezzoNumerico;
    }, 0);

    const totaleLezioni = this.calcolaTotaleLezioni();
    console.log('Totale corsi:', totaleCorsi);

    return totaleCorsi + totaleLezioni;
  }

  calcolaTotaleLezioni(): number {
    const totaleLezioni = this.carrelloLezioni.reduce((acc, lezione) => {
      const prezzoNumerico = typeof lezione.prezzo === 'number' ? lezione.prezzo : parseFloat(lezione.prezzo);
      console.log('Tipo del prezzo:', typeof prezzoNumerico);
      return acc + prezzoNumerico;
    }, 0);

    return totaleLezioni;
  }

  svuotaCarrello(): void {
    console.log('Svuota carrello');
    this.sharedService.svuotaCarrello();
  }

  confermaAcquistoSingoloCorso(corso: Corso): void {
    console.log('Conferma acquisto singolo corso:', corso);
    const conferma = window.confirm(`Sei sicuro di acquistare il corso "${corso.nome}" al prezzo di ${corso.prezzo}€?`);
    if (conferma) {
      this.acquistaSingoloCorso(corso);
    }
  }

  confermaAcquistoSingolaLezione(lezione: Lezione): void {
    console.log('Conferma acquisto singola lezione:', lezione);
    const conferma = window.confirm(`Sei sicuro di acquistare la lezione "${lezione.titolo}" al prezzo di ${lezione.prezzo}€?`);
    if (conferma) {
      this.acquistaSingolaLezione(lezione);
    }
  }

  confermaAcquistoTutto(): void {
    Swal.fire({
      title: 'Conferma l\'acquisto',
      text: `Sei sicuro di acquistare tutto al prezzo totale di ${this.totaleGenerale}€?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sì, conferma',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        this.acquistaTutto();
      }
    });
  }

  acquistaSingoloCorso(corso: Corso): void {
    console.log('Acquista singolo corso:', corso);
    this.router.navigate(['/payment'], {
      state: {
        singoloCorso: corso,
        totale: corso.prezzo
      }
    });
  }

  acquistaSingolaLezione(lezione: Lezione): void {
    console.log('Acquista singola lezione:', lezione);
    this.router.navigate(['/payment'], {
      state: {
        singolaLezione: lezione,
        totale: lezione.prezzo
      }
    });
  }

  acquistaTutto(): void {
    console.log('Acquista tutto');

    const datiAcquisti = {
      carrelloCorsi: this.carrelloCorsi,
      carrelloLezioni: this.carrelloLezioni,
      totale: this.totaleGenerale
    };

    this.sharedService.registraAcquisti(this.carrelloCorsi, this.carrelloLezioni);
  console.log('Dati salvati in localStorage:', datiAcquisti);
  // ...

    this.router.navigate(['/payment']);
  }



  }

