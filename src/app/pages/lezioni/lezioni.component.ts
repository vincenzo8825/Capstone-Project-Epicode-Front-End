// lezioni.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Lezione } from './lezione';

@Component({
  selector: 'app-lezioni',
  templateUrl: './lezioni.component.html',
  styleUrls: ['./lezioni.component.scss'],
})
export class LezioniComponent implements OnInit {
  lezioni: Lezione[] = [];
  categoriaSelezionata: string = '';
  lezioniFiltrate: Lezione[] = [];
  categorieList: string[] = [];
  preferiti: Lezione[] = [];
  carrello: Lezione[] = [];


  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {

    this.sharedService.getElencoLezioni()
      .subscribe(data => {
        this.lezioni = data; // Assicurati che i dati siano assegnati correttamente
        this.categorieList = Array.from(new Set(this.lezioni.map(lezione => lezione.categoria)));
        this.lezioniFiltrate = [...this.lezioni];
      });
  }

  onCategoriaChange(): void {

    if (this.categoriaSelezionata) {
      this.lezioniFiltrate = this.lezioni.filter(lezione =>
        lezione.categoria.toLowerCase() === this.categoriaSelezionata.toLowerCase()
      );
    } else {
      this.lezioniFiltrate = [...this.lezioni];
    }

  }




  addToFavoritesLezione(lezione: Lezione): void {
    if (!this.preferiti.includes(lezione)) {
      this.preferiti.push(lezione);
      console.log(`Aggiunto ai preferiti: ${lezione.titolo}`);
      this.sharedService.aggiungiAiPreferitiLezione(lezione);

      // Aggiungi notifica alla navbar
      this.sharedService.getLezioniUpdated().next();
      this.showNotification('Hai aggiunto una lezione ai preferiti');
    } else {
      console.log(`La lezione è già nei preferiti: ${lezione.titolo}`);
    }
  }

  addToCartLezione(lezione: Lezione): void {
    if (!this.carrello.includes(lezione)) {
      this.carrello.push(lezione);
      console.log(`Aggiunto al carrello: ${lezione.titolo}`);
      this.sharedService.aggiungiAlCarrelloLezione(lezione);
      console.log('Prezzo della lezione:', lezione.prezzo);
      console.log('Carrello delle lezioni:', this.lezioni);
      // Aggiungi notifica alla navbar
      this.sharedService.getLezioniUpdated().next();
      this.showNotification('Hai aggiunto una lezione al carrello');
    } else {
      console.log(`La lezione è già nel carrello: ${lezione.titolo}`);
    }
  }

  private showNotification(message: string): void {
    // Chiamare un metodo nella tua NavbarComponent per visualizzare la notifica
    this.sharedService.showNotification(message);
  }
}
