import { Lezione } from "../lezioni/lezione";

 export interface Corso {

  durata: string;
  livello: string
  autore: string;
    nome: string;
    descrizione: string;
    prezzo:number
    valuta:string
  }
  export interface CategoriaCorso {
    nome: string;
    corsi: Corso[];
  }

