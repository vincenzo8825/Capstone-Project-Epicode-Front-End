// preferiti.component.ts
import { Component } from '@angular/core';
import { Corso } from '..//corsi/corso';
import { Lezione } from '../lezioni/lezione';

import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent {
  preferitiCorsi: Corso[] = [];
  preferitiLezioni: Lezione[] = [];

  constructor(private sharedService: SharedService) {
    this.loadPreferiti();
  }

  rimuoviDaPreferitiCorso(corso: Corso): void {
    this.sharedService.rimuoviDaPreferitiCorso(corso);
    console.log(`Rimosso dai preferiti: ${corso.nome}`);
    this.loadPreferiti();
  }

  rimuoviDaPreferitiLezione(lezione: Lezione): void {
    this.sharedService.rimuoviDaPreferitiLezione(lezione);
    console.log(`Rimosso dai preferiti: ${lezione.titolo}`);
    this.loadPreferiti();
  }

  aggiungiAlCarrello(corso: Corso | Lezione): void {
    if ('livello' in corso) {
      this.aggiungiAlCarrelloCorso(corso as Corso);
    } else {
      this.aggiungiAlCarrelloLezione(corso as Lezione);
    }
    console.log(`Aggiunto al Carrello: ${corso || corso}`);
  }

  private aggiungiAlCarrelloCorso(corso: Corso): void {
    this.sharedService.aggiungiAlCarrelloCorso(corso);
  }

  private aggiungiAlCarrelloLezione(lezione: Lezione): void {
    this.sharedService.aggiungiAlCarrelloLezione(lezione);
  }

  private loadPreferiti(): void {
    this.preferitiCorsi = this.sharedService.getPreferitiCorsi();
    this.preferitiLezioni = this.sharedService.getPreferitiLezioni();
  }
}
