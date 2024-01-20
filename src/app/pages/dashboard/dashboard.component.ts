import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Corso } from '../corsi/corso';
import { Lezione } from '../lezioni/lezione';
import Swal from 'sweetalert2';
export type ProfessoreSelezionato = {
  nome: string;
  tipo: 'autore' | 'istruttore';
  dettagli: Corso | Lezione;
};
type FasciaOraria = {
  inizio: string;
  fine: string;
  professore: string;
};
interface Prenotazione {
  data: string;
  inizio: string;
  fine: string;
  professore: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentViewIndex: number = 0;
  selectedDate: Date | null = null;
  professoriDisponibili: string[] = [];
  messaggioStato: string | null = null;
  professoriTotali: string[] = [

    'Tutor Luca Neri',
    'Tutor Sara Verdi',
    'Tutor Marco Gialli',
     'Tutor Giulia Rosa',
    'Prof. Antonio Viola',
    'Tutor Franco Marrone'
  ];
    calendarioFasceOrarie: Record<string, { inizio: string, fine: string, professore: string }[]> = {};
  fasceOrarieProfessoreSelezionato: { inizio: string, fine: string, professore: string }[] = [];
  professoreSelezionato: string | null = null;
  fasciaOrariaSelezionata: { inizio: string, fine: string, professore: string } | null = null;
  prenotazioni: Prenotazione[] = [];

  constructor() {}

  ngOnInit(): void {
    this.popolaCalendarioDisponibilita();

  }
  popolaCalendarioDisponibilita(): void {
    const inizioAnno = new Date(2024, 1, 1);
    const fineAprile = new Date(2024, 3, 30);
    const fasceOrarieFisse = [
      { inizio: '09:00', fine: '10:00' },
      { inizio: '10:00', fine: '11:00' },
      { inizio: '11:00', fine: '12:00' },
      { inizio: '15:00', fine: '16:00' },
      { inizio: '16:00', fine: '17:00' },
      { inizio: '17:00', fine: '18:00' }
    ];

    for (let data = new Date(inizioAnno); data <= fineAprile; data.setDate(data.getDate() + 1)) {
      const chiaveData = data.toISOString().split('T')[0];
      this.calendarioFasceOrarie[chiaveData] = [];

      // Mescolare e selezionare un sottoinsieme casuale di tutor
      const professoriMescolati = this.mescolaArray(this.professoriTotali);
      const numProfessoriPerGiorno = Math.floor(Math.random() * this.professoriTotali.length) + 1; // Da 1 a numero totale di professori
      const professoriSelezionati = professoriMescolati.slice(0, numProfessoriPerGiorno);

      professoriSelezionati.forEach((professore, indice) => {
        const fasciaOraria = fasceOrarieFisse[indice % fasceOrarieFisse.length];
        this.calendarioFasceOrarie[chiaveData].push({
          inizio: fasciaOraria.inizio,
          fine: fasciaOraria.fine,
          professore
        });
      });
    }
  }

  mescolaArray(array: string[]): string[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }



  onTabChange(event: MatTabChangeEvent): void {
    this.currentViewIndex = event.index;
  }

  handleDateSelection(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.aggiornaProfessoriDisponibili();
  }

  mostraFasceOrarie(professore: string): void {
    this.professoreSelezionato = professore;
    this.aggiornaFasceOrarie();
  }

  selezionaFasciaOraria(fasciaSelezionata: { inizio: string, fine: string, professore: string }): void {
    this.fasciaOrariaSelezionata = fasciaSelezionata;
  }

  aggiornaProfessoriDisponibili(): void {
    if (this.selectedDate) {
      const chiaveData = this.selectedDate.toISOString().split('T')[0];
      const disponibilita = this.calendarioFasceOrarie[chiaveData] || [];
      this.professoriDisponibili = disponibilita.map(fascia => fascia.professore);
    } else {
      this.professoriDisponibili = [];
    }
  }

  aggiornaFasceOrarie(): void {
    if (this.selectedDate && this.professoreSelezionato) {
      const chiaveData = this.selectedDate.toISOString().split('T')[0];
      this.fasceOrarieProfessoreSelezionato = this.calendarioFasceOrarie[chiaveData].filter(fascia => fascia.professore === this.professoreSelezionato);
    } else {
      this.fasceOrarieProfessoreSelezionato = [];
    }
  }

  prenotaAppuntamento(): void {
    if (this.selectedDate && this.professoreSelezionato && this.fasciaOrariaSelezionata) {
      // Formatta la data selezionata per la visualizzazione
      const dataFormattata = this.selectedDate.toLocaleDateString();

      // Costruisci il messaggio di conferma
      const messaggioConferma = `Ti sei prenotato con ${this.professoreSelezionato} per la fascia oraria dalle ${this.fasciaOrariaSelezionata.inizio} alle ${this.fasciaOrariaSelezionata.fine} il giorno ${dataFormattata}.`;

      // Mostra l'alert di conferma
      Swal.fire({
        title: 'Prenotazione Confermata!',
        text: messaggioConferma,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Dopo la conferma, resetta le selezioni per evitare prenotazioni duplicate
        this.resetPrenotazione();
      });
    } else {
      // Gestisci il caso in cui la prenotazione non può essere completata
      Swal.fire({
        title: 'Errore',
        text: 'Per favore, completa tutti i passaggi della prenotazione.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  // Metodo per resettare le selezioni di prenotazione
  resetPrenotazione() {
    this.selectedDate = null;
    this.professoreSelezionato = null;
    this.fasciaOrariaSelezionata = null;
    // Aggiungi qui qualsiasi altra logica necessaria per resettare lo stato del componente
  }

  // Aggiungi qui ulteriori metodi come la prenotazione effettiva
}
