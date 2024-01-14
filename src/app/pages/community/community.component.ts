import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Announcement, CommunityEvent, DiscussionTopic, FAQ, UserReview, } from './community-interface';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  discussionTopics: DiscussionTopic[] = [

  ];
  announcements: Announcement[] = [
    // Dati degli annunci
  ];
  upcomingEvents: CommunityEvent[] = [
    // Dati degli eventi imminenti
  ];
  faqs: FAQ[] = [
    // Dati delle FAQ
  ];
  userReviews: UserReview[] = [
    // Recensioni degli utenti esistenti
  ];
  iscrizioni: { [eventName: string]: boolean } = {};
  iscrizioneAvvenuta: boolean = false; // Aggiunto stato di iscrizione
  isPulsanteAttivo: boolean = true;
  newReview: UserReview = { user: '', comment: '', rating: 0 };
  sharedService: SharedService;
  router: Router;

  constructor(sharedService: SharedService, router: Router) {
    this.sharedService = sharedService;
    this.router = router;
  }

  ngOnInit(): void {
    this.loadDiscussionTopics();
    this.loadAnnouncements();
    this.loadUpcomingEvents();
    this.loadFAQs();
    this.loadUserReviews();
  }


  loadDiscussionTopics(): void {
    this.discussionTopics = [
      {
        title: 'Trend del Web Development 2024',
        content: 'Discussione approfondita sui nuovi trend nel web development, includendo framework emergenti, best practices e case study.',
        isClosed: false
      },
      {
        title: 'Introduzione al Machine Learning',
        content: 'Scopriamo le basi del machine learning, con una panoramica sui vari algoritmi e le loro applicazioni pratiche.',
        isClosed: false
      },
      {
        title: 'Principi Fondamentali del UX/UI Design',
        content: 'Esploriamo i principi chiave del design dell\'interfaccia utente e dell\'esperienza utente, con esempi pratici e ultime tendenze.',
        isClosed: true
      },
      {
        title: 'Python per Data Science: Una Guida Completa',
        content: 'Una discussione completa su come Python viene utilizzato nella data science, con esempi di librerie come Pandas e NumPy.',
        isClosed: false
      },
      {
        title: 'Intelligenza Artificiale: Etica e Futuro',
        content: 'Un dibattito sull\'impatto etico dell\'intelligenza artificiale e sulle sue implicazioni future in vari settori.',
        isClosed: false
      },
      {
        title: 'Sviluppo di Applicazioni Full Stack con JavaScript',
        content: 'Approfondimento sullo sviluppo di applicazioni full stack utilizzando tecnologie JavaScript come Node.js, React, e MongoDB.',
        isClosed: false
      },
      {
        title: 'Blockchain e le Sue Applicazioni Oltre le Criptovalute',
        content: 'Discussione sulle applicazioni della tecnologia blockchain al di là del mondo delle criptovalute, inclusi smart contract e supply chain.',
        isClosed: false
      },
      {
        title: 'Big Data e Analytics: Strumenti e Strategie',
        content: 'Analisi degli strumenti e delle strategie per il lavoro con Big Data, inclusi sistemi di gestione del database e tecniche di visualizzazione.',
        isClosed: false
      }
      // Aggiungi altri topic qui
    ];
  }



  loadAnnouncements(): void {
    this.announcements = [
      { title: 'Nuovo Corso Avanzato di JavaScript', content: 'Esplora funzionalità avanzate di JavaScript...' },
      { title: 'Workshop su Python per Data Science', content: 'Partecipa al nostro workshop intensivo...' },
      // Aggiungi altri annunci qui
    ];
  }

  loadUpcomingEvents(): void {
    this.upcomingEvents = [
      {
        name: 'Marathon di Programmazione',
        date: new Date(2024, 5, 15),
        description: 'Unisciti alla nostra Marathoathon annuale di programmazione. Sfida te stesso e altri sviluppatori in una serie di compiti di codifica!'
      },
      {
        name: 'Seminario su Blockchain e Criptovalute',
        date: new Date(2024, 6, 20),
        description: 'Impara tutto sulla blockchain e le criptovalute in questo seminario interattivo. Esperti del settore condivideranno le loro conoscenze e esperienze.'
      },
      {
        name: 'Workshop su UX/UI Design',
        date: new Date(2024, 7, 10),
        description: 'Partecipa al nostro workshop su UX/UI Design per migliorare le tue competenze di design e apprendere le ultime tendenze del settore.'
      },
      {
        name: 'Corso Intensivo di Data Science',
        date: new Date(2024, 8, 5),
        description: 'Immergiti nel mondo della data science con il nostro corso intensivo, che copre argomenti da analisi dei dati a machine learning.'
      }
      // Aggiungi altri eventi qui
    ];
  }
  registerForEvent(event: { name: string; }): void {
    Swal.fire({
      title: 'Iscrizione Confermata!',
      text: `Ti sei iscritto con successo a "${event.name}"!`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharedService.aggiungiEventoIscritto(event.name);
        this.router.navigate(['/profiloutente']);
        this.iscrizioni[event.name] = true;
      }
    });
  }



  loadFAQs(): void {
    this.faqs = [
      {
        question: 'Come posso iscrivermi ai corsi?',
        answer: 'Per iscriverti ai nostri corsi, visita la sezione "Corsi" sul nostro sito web, scegli il corso che desideri seguire e clicca su "Iscriviti ora". Sarai guidato attraverso il processo di registrazione e pagamento. Una volta completata l\'iscrizione, riceverai tutte le informazioni necessarie per iniziare il tuo percorso di apprendimento.'
      },
      {
        question: 'Quali risorse sono disponibili per l\'apprendimento?',
        answer: 'Offriamo una vasta gamma di risorse, tra cui video lezioni, esercizi pratici, documentazione dettagliata, progetti reali e forum di discussione. Inoltre, forniamo accesso a tutor esperti per assistenza individuale e sessioni di Q&A regolari.'
      },
      {
        question: 'Ci sono corsi specializzati in programmazione web?',
        answer: 'Sì, offriamo corsi specializzati in vari aspetti della programmazione web, inclusi HTML, CSS, JavaScript, React, Node.js e sviluppo di applicazioni full stack. I corsi variano da livello principiante a avanzato.'
      },
      {
        question: 'Offrite formazione in data science e machine learning?',
        answer: 'Certamente! I nostri corsi di data science e machine learning coprono una vasta gamma di argomenti, come Python per la data science, analisi statistica, apprendimento automatico, deep learning e intelligenza artificiale, con esempi pratici e progetti.'
      },
      {
        question: 'Cosa posso aspettarmi dai corsi di UX/UI Design?',
        answer: 'I nostri corsi di UX/UI Design forniscono competenze pratiche su design dell\'interfaccia utente, esperienza utente, prototipazione, wireframing e strumenti come Sketch e Adobe XD. Imparerai attraverso studi di caso reali e progetti di design.'
      },
      {
        question: 'Ci sono opportunità di apprendimento pratico?',
        answer: 'Sì, tutti i nostri corsi includono progetti pratici per mettere in pratica ciò che hai appreso. Questo include lo sviluppo di applicazioni web, analisi di dataset reali, creazione di prototipi di design e molto altro.'
      }
      // Continua ad aggiungere altre FAQ qui
    ];
  }

  loadUserReviews(): void {
    this.userReviews = [
      { user: 'Alice', comment: 'Fantastico corso su React!', rating: 5 },
      { user: 'Bob', comment: 'Molto utile per capire i fondamenti del machine learning.', rating: 4 },
      // Aggiungi altre recensioni qui
    ];
  }

  addReview(): void {
    if (this.newReview.user && this.newReview.comment && this.newReview.rating > 0) {
      this.userReviews.push({ ...this.newReview });
      this.newReview = { user: '', comment: '', rating: 0 }; // Reset del form
    } else {
      console.log('Per favore, compila tutti i campi della recensione.');
    }
  }

  getStars(rating: number): Array<number> {
    return new Array(rating);
  }
  uniscitiAllaCommunity(): void {
    if (!this.iscrizioneAvvenuta) {
      // Imposta il testo del pulsante su "Iscritto"
      this.iscrizioneAvvenuta = true;

      // Visualizza il messaggio di iscrizione confermata
      Swal.fire({
        title: 'Iscrizione Confermata!',
        text: 'Ti sei iscritto con successo alla Community!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }
}
