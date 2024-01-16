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
  mostraFormCandidatura: boolean = false;
  posizioneSelezionataIndex: number = -1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Inizializzazione dei form
    this.autoCandidaturaForm = this.createFormGroup();
    this.contattoForm = this.createFormGroup();

    // Posizioni aperte fittizie
    this.posizioniAperte = [
      { id: 1, titolo: 'Sviluppatore Web Front-End', descrizione: 'Descrizione Sviluppatore Web Front-End...' },
      { id: 2, titolo: 'Esperto di Machine Learning', descrizione: 'Descrizione Esperto di Machine Learning...' },
      { id: 3, titolo: 'Designer Grafico per Corsi Online', descrizione: 'Descrizione Designer Grafico...' },
      // Altre posizioni...
    ];
    this.candidaturaForms = this.posizioniAperte.map(() => this.createFormGroup());
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      file: [null, Validators.required],
      messaggio: ['']  // Aggiunto solo per il form dei contatti
    });
  }

  onSubmitForm(form: FormGroup, tipo: string) {
    if (form.valid) {
      // Logica per gestire l'invio del form

      // Eseguire il reset del form dopo l'invio con successo
      form.reset();

      Swal.fire('Successo!', `La tua ${tipo} è stata inviata con successo.`, 'success');
    } else {
      Swal.fire('Errore!', 'Per favore, completa tutti i campi richiesti.', 'error');
    }
  }

  onSubmitContattoForm(form: FormGroup) {
    const nomeControl = form.get('nome');
    const cognomeControl = form.get('cognome');
    const emailControl = form.get('email');
    const messaggioControl = form.get('messaggio');

    if (nomeControl && cognomeControl && emailControl && messaggioControl) {
      if (nomeControl.valid && cognomeControl.valid && emailControl.valid && messaggioControl.valid) {
        // Tutti i campi sono validi

        // Esegui il reset del form dopo l'invio con successo
        form.reset();

        Swal.fire('Successo!', 'Abbiamo preso in carica la tua richiesta. Ti contatteremo appena possibile.', 'success');
      } else {
        Swal.fire('Errore!', 'Per favore, completa tutti i campi richiesti e assicurati di inserire un indirizzo email valido.', 'error');
      }
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
      this.resetCandidaturaForm();
    } else {
      Swal.fire('Errore!', 'Per favore, completa tutti i campi richiesti.', 'error');
    }
  }

  resetCandidaturaForm() {
    this.mostraFormCandidatura = false;
    this.posizioneSelezionataIndex = -1;
  }

  apriFormCandidatura(index: number) {
    this.mostraFormCandidatura = true;
    this.posizioneSelezionataIndex = index;
  }
}
