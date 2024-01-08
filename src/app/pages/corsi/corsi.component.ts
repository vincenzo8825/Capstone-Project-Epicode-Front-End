import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Corso } from '../corsi/corso';
import { CategoriaCorso } from './corso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-corsi',
  templateUrl: './corsi.component.html',
  styleUrls: ['./corsi.component.scss']
})
export class CorsiComponent implements OnInit {
  corsi: Corso[] = [];
  categorieCorsi: CategoriaCorso[] = [];
  categoriaSelezionata: string = '';
  categoriaSelezionataCorsi: Corso[] = [];

  constructor(
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  addToFavorites(corso: Corso): void {
    this.sharedService.addToFavoritesCorso(corso)
      .subscribe(
        () => {
          console.log(`Aggiunto ai preferiti: ${corso.nome}`);
          this.loadData();
          this.showNotification(`Hai aggiunto ${corso.nome} ai preferiti`);
        },
        (error: Error) => {
          console.error('Errore durante l\'aggiunta ai preferiti:', error.message);
          this.showNotification(`Errore: Impossibile aggiungere ${corso.nome} ai preferiti`);
        }
      );
  }

  addToCart(corso: Corso): void {
    this.sharedService.aggiungiAlCarrelloCorso(corso);
    console.log(`Aggiunto al carrello: ${corso.nome} - Prezzo: ${corso.prezzo} ${corso.valuta}`);
    this.showNotification(`Hai aggiunto ${corso.nome} al carrello`);
  }

  private loadData(): void {
    this.sharedService.getElencoCorsi()
      .subscribe(
        (corsi: Corso[]) => {
          this.corsi = corsi;
          this.organizzaCorsiPerCategorie();
          this.filtraCorsiPerCategoria();
        },
        (error: Error) => {
          console.error('Errore durante il recupero dei corsi:', error.message);
          this.showNotification('Errore: Impossibile recuperare l\'elenco dei corsi');
        }
      );
  }

  private organizzaCorsiPerCategorie(): void {
    const livelliUnici = Array.from(new Set(this.corsi.map(corso => corso.livello)));
    this.categorieCorsi = livelliUnici.map(livello => ({
      nome: livello,
      corsi: this.corsi.filter(corso => corso.livello === livello)
    }));
  }

  private filtraCorsiPerCategoria(): void {
    this.categoriaSelezionataCorsi = this.categorieCorsi
      .find(categoria => categoria.nome === this.categoriaSelezionata)?.corsi || [];
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }



}


