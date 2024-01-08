// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Corso } from '../corsi/corso';
import { Lezione } from '../lezioni/lezione';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // ... altri membri della classe

  selectPaymentMethod(paymentMethod: string): void {
    this.selectedPaymentMethod = paymentMethod;
  }
  carrelloCorsi: Corso[] = [];
  carrelloLezioni: Lezione[] = [];
  totaledapagare: number = 0;
  selectedPaymentMethod: string = '';

  // Dichiarare i form per i metodi di pagamento
  cartaDiCreditoForm!: FormGroup;
  paypalForm!: FormGroup;
  ibanForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sharedService.totaleGenerale$.subscribe((totale) => {
      this.totaledapagare = totale;
    });

    // Inizializzare i form per i metodi di pagamento
    // Inizializzare i form per i metodi di pagamento
this.cartaDiCreditoForm = this.formBuilder.group({
  ccNumber: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[0-9]+$/), // Accetta solo numeri
      Validators.minLength(16),
      Validators.maxLength(16)
    ]
  ],
  ccExpiry: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d{2}\/\d{2}$/),
      Validators.maxLength(5)
    ]
  ],
  ccCVV: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d{3}$/),
      Validators.maxLength(3)
    ]
  ],
  amount: [this.totaledapagare, Validators.required],
  courses: [this.carrelloCorsi],
  lessons: [this.carrelloLezioni],

});

this.paypalForm = this.formBuilder.group({
  paypalEmail: ['', [Validators.required, Validators.email]],
  // ... altri campi
});
this.ibanForm = this.formBuilder.group({
  iban: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{16}$/)]],

  intestatario: ['', Validators.required],
  nomeBanca: ['', Validators.required],
  amountIBAN: [this.totaledapagare, Validators.required],
  coursesIBAN: [this.carrelloCorsi],
  lessonsIBAN: [this.carrelloLezioni],
  discountCodeIBAN: [''],
  quantityIBAN: [1, Validators.min(1)],
});




}




  // Funzione chiamata quando si conferma l'ordine
  confermaOrdine(): void {
    // Logica per confermare l'ordine

    // Mostra la notifica di successo con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Acquisto avvenuto con successo!',
      text: 'Grazie per il tuo acquisto. Riceverai una conferma via email.',
      confirmButtonText: 'Ok'
    }).then(() => {
      // Puoi aggiungere qui eventuali azioni da eseguire dopo che l'utente ha cliccato su "Ok"
    });
  }

  // Funzione per il pagamento con carta di credito
  pagamentoCartaDiCredito(): void {
    console.log('Funzione pagamentoCartaDiCredito chiamata!');

    // Verifica la validità del form
    if (this.cartaDiCreditoForm.valid) {
      // Logica per il pagamento con carta di credito
      console.log('Pagamento con carta di credito confermato!');

      // Mostra SweetAlert2 per il successo
      Swal.fire({
        icon: 'success',
        title: 'Pagamento effettuato correttamente!',
        text: 'Riceverai a breve una email di conferma.',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Aggiungi eventuali azioni da eseguire dopo che l'utente ha cliccato su "Ok"
      });
    } else {
      // Mostra un avviso di errore se il form non è valido
      console.log('Form non valido. Dettagli:', this.cartaDiCreditoForm);
      Object.keys(this.cartaDiCreditoForm.controls).forEach(key => {
        const controlErrors = this.cartaDiCreditoForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error(`Campo ${key} ha errore ${keyError} con valore ${this.cartaDiCreditoForm.get(key)?.value}`);
          });
        }
      });

      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Controlla i campi del pagamento con carta di credito e riprova.',
        confirmButtonText: 'Ok'
      });
    }

  }

  // Funzione per il pagamento con PayPal
  effettuaPagamentoPayPal(): void {
    // Marca il campo come "touched" per visualizzare gli errori solo dopo che l'utente ha interagito con il campo.
    this.paypalForm.get('paypalEmail')?.markAsTouched();

    // Verifica la validità del form
    if (this.paypalForm.valid) {
      // Mostra un avviso di successo usando SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Pagamento avvenuto con successo!',
        text: 'Grazie per il tuo acquisto. Riceverai una conferma via email.',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Esegue eventuali azioni supplementari dopo che l'utente ha cliccato su "Ok"
        this.pagamentoPayPal();
      });
    } else {
      // Mostra un avviso di errore usando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Formato email non valido. Inserisci un indirizzo email valido.',
        confirmButtonText: 'Ok'
      });
    }
  }

  // Funzione per il pagamento con PayPal
  pagamentoPayPal(): void {
    // Logica per il pagamento con PayPal
    console.log('Pagamento con PayPal confermato!');
  }
  // Funzione per il pagamento con IBAN
  pagamentoIBAN(): void {
    // Verificare la validità del form
    if (this.ibanForm.valid) {
      // Logica per il pagamento con IBAN
      console.log('Pagamento con IBAN confermato!');

      // Mostra la notifica di successo con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Pagamento avvenuto con successo!',
        text: 'Grazie per il tuo acquisto. Riceverai una conferma via email.',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Puoi aggiungere qui eventuali azioni da eseguire dopo che l'utente ha cliccato su "Ok"
      });
    } else {
      // Mostra un messaggio di errore se il form non è valido
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Controlla i campi del pagamento con IBAN e riprova.',
        confirmButtonText: 'Ok'
      });
    }
  }

  // Gestione degli errori di pagamento
  handlePaymentError(error: any): void {
    console.error('Errore di pagamento:', error);
    // Implementa la gestione degli errori qui, ad esempio, mostra un messaggio all'utente
  }
}
