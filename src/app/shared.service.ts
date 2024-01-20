import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { Corso } from './pages/corsi/corso';
import { Lezione } from './pages/lezioni/lezione';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private preferitiCorsiSubject = new BehaviorSubject<Corso[]>([]);
  preferitiCorsi$ = this.preferitiCorsiSubject.asObservable();

  private preferitiLezioniSubject = new BehaviorSubject<Lezione[]>([]);
  preferitiLezioni$ = this.preferitiLezioniSubject.asObservable();

  private carrelloCorsiSubject = new BehaviorSubject<Corso[]>([]);
  carrelloCorsi$ = this.carrelloCorsiSubject.asObservable();

  private carrelloLezioniSubject = new BehaviorSubject<Lezione[]>([]);
  carrelloLezioni$ = this.carrelloLezioniSubject.asObservable();

  private elencoCorsiSubject = new BehaviorSubject<Corso[]>([]);
  elencoCorsi$ = this.elencoCorsiSubject.asObservable();

  private elencoLezioniSubject = new BehaviorSubject<Lezione[]>([]);
  elencoLezioni$ = this.elencoLezioniSubject.asObservable();
  private totaleGeneraleSubject = new BehaviorSubject<number>(0);
  totaleGenerale$ = this.totaleGeneraleSubject.asObservable();
  private lezioniUpdated = new BehaviorSubject<void>(undefined);
  private preferitiUpdated = new BehaviorSubject<void>(undefined);
  private carrelloUpdated = new BehaviorSubject<void>(undefined);
  private corsiUpdated = new BehaviorSubject<void>(undefined);
  private corsiAcquistatiSubject = new BehaviorSubject<Corso[]>([]);
  corsiAcquistati$ = this.corsiAcquistatiSubject.asObservable();

  private lezioniAcquistateSubject = new BehaviorSubject<Lezione[]>([]);
  lezioniAcquistate$ = this.lezioniAcquistateSubject.asObservable();
  private eventiIscrittiSubject = new BehaviorSubject<string[]>([]);
  eventiIscritti$ = this.eventiIscrittiSubject.asObservable();
  private iscrizioni: { [eventName: string]: boolean } = {};
  isIscrizioneAvvenuta: boolean = false;
  private appuntamentiSubject = new BehaviorSubject<{ professore: string, orario: string }[]>([]);
appuntamenti$ = this.appuntamentiSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    // Carica gli eventi iscritti dal localStorage
    const eventiSalvati = localStorage.getItem('eventiIscritti');
    if (eventiSalvati) {
      this.eventiIscrittiSubject.next(JSON.parse(eventiSalvati));
    }
    const iscrizioniStorage = JSON.parse(localStorage.getItem('iscrizioni') || '{}');
    this.iscrizioni = iscrizioniStorage;
  }


  addToLezioni(lezione: Lezione): Observable<void> {
    const carrelloLezioni = this.carrelloLezioniSubject.value;

    if (!carrelloLezioni.includes(lezione)) {
      this.carrelloLezioniSubject.next([...carrelloLezioni, lezione]);
      this.carrelloUpdated.next();
    }

    return new Observable((observer) => {
      // Simula un breve ritardo prima di completare l'observable
      setTimeout(() => {
        // Notifica il completamento
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
aggiungiAppuntamento(appuntamento: { professore: string, orario: string }): void {
  const appuntamentiCorrenti = this.appuntamentiSubject.value;
  this.appuntamentiSubject.next([...appuntamentiCorrenti, appuntamento]);
}
  addToFavoritesCorso(corso: Corso): Observable<void> {
    const preferiti = this.preferitiCorsiSubject.value;

    // Verifica se il corso è già nei preferiti
    if (!preferiti.some(c => c.nome === corso.nome)) {
      preferiti.push(corso);
      this.preferitiCorsiSubject.next(preferiti);
      this.preferitiUpdated.next();
    }

    // Notifica l'aggiornamento delle lezioni (simulando una richiesta HTTP)
    this.corsiUpdated.next();

    return new Observable((observer) => {
      // Simula un breve ritardo prima di completare l'observable
      setTimeout(() => {
        // Notifica il completamento
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
  getLezioniUpdated(): BehaviorSubject<void> {
    return this.lezioniUpdated;
  }

  getPreferitiUpdated(): BehaviorSubject<void> {
    return this.preferitiUpdated;
  }

  getCarrelloUpdated(): BehaviorSubject<void> {
    return this.carrelloUpdated;
  }

  getCorsiUpdated(): BehaviorSubject<void> {
    return this.corsiUpdated;
  }

  aggiungiAiPreferitiCorso(corso: Corso): void {
    this.preferitiCorsiSubject.next([...this.preferitiCorsiSubject.value, corso]);
    this.preferitiUpdated.next();
  }

  aggiungiAiPreferitiLezione(lezione: Lezione): void {
    this.preferitiLezioniSubject.next([...this.preferitiLezioniSubject.value, lezione]);
    this.preferitiUpdated.next();
  }

  rimuoviDaPreferitiCorso(corso: Corso): void {
    const preferiti = this.preferitiCorsiSubject.value.filter((c) => c !== corso);
    this.preferitiCorsiSubject.next(preferiti);
    this.preferitiUpdated.next();
  }

  rimuoviDaPreferitiLezione(lezione: Lezione): void {
    const preferiti = this.preferitiLezioniSubject.value.filter((l) => l !== lezione);
    this.preferitiLezioniSubject.next(preferiti);
    this.preferitiUpdated.next();
  }

  aggiungiAlCarrelloCorso(corso: Corso): void {
    this.carrelloCorsiSubject.next([...this.carrelloCorsiSubject.value, corso]);
    this.carrelloUpdated.next();
  }

  rimuoviDalCarrelloCorso(corso: Corso): void {
    const carrelloCorsi = this.carrelloCorsiSubject.value.filter((c) => c !== corso);
    this.carrelloCorsiSubject.next(carrelloCorsi);
    this.carrelloUpdated.next();
  }

  aggiungiAlCarrelloLezione(lezione: Lezione): void {
    console.log('Lezione aggiunta al carrello:', lezione);
    this.carrelloLezioniSubject.next([...this.carrelloLezioniSubject.value, lezione]);
    this.carrelloUpdated.next();
  }

  rimuoviDalCarrelloLezione(lezione: Lezione): void {
    console.log('Lezione rimossa dal carrello:', lezione);
    const carrelloLezioni = this.carrelloLezioniSubject.value.filter((l) => l !== lezione);
    this.carrelloLezioniSubject.next(carrelloLezioni);
    this.carrelloUpdated.next();
  }

  svuotaCarrello(): void {
    this.carrelloCorsiSubject.next([]);
    this.carrelloLezioniSubject.next([]);
    this.carrelloUpdated.next();
  }

  getPreferitiCorsi(): Corso[] {
    return this.preferitiCorsiSubject.value;
  }

  getPreferitiLezioni(): Lezione[] {
    return this.preferitiLezioniSubject.value;
  }

  getCarrelloCorsi(): Corso[] {
    return this.carrelloCorsiSubject.value;
  }

  getCarrelloLezioni(): Lezione[] {
    return this.carrelloLezioniSubject.value;
  }

  getElencoCorsi(): Observable<Corso[]> {
    const url = 'http://localhost:3000/corsi';
    return this.http.get<Corso[]>(url);
  }

  aggiornaElencoCorsi(corsi: Corso[]): void {
    this.elencoCorsiSubject.next(corsi);
    this.corsiUpdated.next();
  }

  getElencoLezioni(): Observable<Lezione[]> {
    const url = 'http://localhost:3000/lezioni';
    return this.http.get<Lezione[]>(url);
  }

  aggiornaElencoLezioni(lezioni: Lezione[]): void {
    this.elencoLezioniSubject.next(lezioni);
  }

  updateTotaleGenerale(totale: number): void {
    this.totaleGeneraleSubject.next(totale);
  }


  showNotification(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
    });
  }

  private navigateToPreferiti(): void {
    this.router.navigate(['/preferiti']);
  }
  registraAcquisti(corsi: Corso[], lezioni: Lezione[]): void {
    this.corsiAcquistatiSubject.next(corsi);
    this.lezioniAcquistateSubject.next(lezioni);
    // Salva i dati nel localStorage se necessario
    const datiAcquisti = {
      carrelloCorsi: corsi,
      carrelloLezioni: lezioni
      // Aggiungi altre informazioni necessarie, come il totale, se necessario
    };
    localStorage.setItem('datiAcquisti', JSON.stringify(datiAcquisti));
  }
  sincronizzaDatiAcquistiConSubject(corsi: Corso[], lezioni: Lezione[]): void {
    this.corsiAcquistatiSubject.next(corsi);
    this.lezioniAcquistateSubject.next(lezioni);
  }

  aggiungiEventoIscritto(nomeEvento: string) {
    const eventiIscritti = JSON.parse(localStorage.getItem('eventiIscritti') || '[]') as string[];
    eventiIscritti.push(nomeEvento);
    localStorage.setItem('eventiIscritti', JSON.stringify(eventiIscritti));
    // Aggiungi l'evento alla lista degli eventi iscritti
    this.iscrizioni[nomeEvento] = true;
  }



  isEventoIscritto(name: string): boolean {
    // Verifica se l'evento è presente nell'elenco delle iscrizioni
    return !!this.iscrizioni[name];
  }



  getEventiIscritti(): Observable<string[]> {
    return this.eventiIscritti$;
  }
  loadIscrizioniUtente(): void {
    const eventiIscrittiStorage = JSON.parse(localStorage.getItem('eventiIscritti') || '{}') as { [nomeEvento: string]: boolean };
    this.iscrizioni = eventiIscrittiStorage;
  }

}


