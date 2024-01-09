import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface PosizioneAperta {
  id: number;
  titolo: string;
  descrizione: string;
}

@Component({
  selector: 'app-lavora-con-noi',
  templateUrl: './lavora-con-noi.component.html',
  styleUrls: ['./lavora-con-noi.component.scss']
})
export class LavoraConNoiComponent implements OnInit {
  autoCandidaturaForm!: FormGroup;
  candidaturaForms!: FormGroup[];
  contattoForm!: FormGroup;
  posizioniAperte!: PosizioneAperta[];
  posizioneSelezionataIndex: number = -1;
  mostraFormCandidatura: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Inizializza i form
    this.autoCandidaturaForm = this.createFormGroup();
    this.contattoForm = this.createFormGroup();

    // Definisci le posizioni aperte fittizie
    this.posizioniAperte = [
      { id: 1, titolo: 'Tutor di Matematica', descrizione: 'Insegnamento di matematica avanzata.' },
      { id: 2, titolo: 'Sviluppatore Web', descrizione: 'Sviluppo front-end e back-end.' },
      // Aggiungi altre posizioni fittizie qui
    ];

    // Inizializza un form per ciascuna posizione aperta
    this.candidaturaForms = this.posizioniAperte.map(() => this.createFormGroup());
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      file: [null, Validators.required],
      messaggio: [''] // Solo per il form dei contatti
    });
  }

  onSubmitForm(form: FormGroup, tipo: string) {
    if (form.valid) {
      Swal.fire('Successo!', `La tua ${tipo} è stata inviata con successo.`, 'success');
    } else {
      Swal.fire('Errore!', 'Per favore, completa tutti i campi richiesti.', 'error');
    }
  }

  onSubmitCandidatura(index: number) {
    const form = this.candidaturaForms[index];
    if (form.valid) {
      Swal.fire(
        'Candidatura Inviata!',
        `La tua candidatura per "${this.posizioniAperte[index].titolo}" è stata inviata con successo.`,
        'success'
      );
      this.mostraFormCandidatura = false; // Nascondi il form di candidatura
      this.posizioneSelezionataIndex = -1; // Resetta la posizione selezionata
    } else {
      Swal.fire('Errore!', 'Per favore, completa tutti i campi richiesti.', 'error');
    }
  }

  // Funzione per mostrare il form di candidatura per una posizione specifica
  apriFormCandidatura(index: number) {
    this.posizioneSelezionataIndex = index;
    this.mostraFormCandidatura = true;
  }
}
