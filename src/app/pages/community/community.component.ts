import { Component, OnInit } from '@angular/core';

interface DiscussionTopic {
  title: string;
  content: string;
}

interface Announcement {
  title: string;
  content: string;
}

interface Event {
  name: string;
  date: Date;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface UserReview {
  user: string;
  comment: string;
  rating: number;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  discussionTopics: DiscussionTopic[] = [
    // Qui potresti avere i tuoi dati iniziali o caricarli da un servizio
  ];
  announcements: Announcement[] = [
    // Dati degli annunci
  ];
  upcomingEvents: Event[] = [
    // Dati degli eventi imminenti
  ];
  faqs: FAQ[] = [
    // Dati delle FAQ
  ];
  userReviews: UserReview[] = [
    // Recensioni degli utenti esistenti
  ];

  // Modello iniziale per una nuova recensione
  newReview: UserReview = { user: '', comment: '', rating: 0 };

  constructor() {}

  ngOnInit(): void {
    this.loadDiscussionTopics();
    this.loadAnnouncements();
    this.loadUpcomingEvents();
    this.loadFAQs();
    this.loadUserReviews();
  }


  loadDiscussionTopics(): void {
    this.discussionTopics = [
      { title: 'Trend del Web Development 2024', content: 'Discussione approfondita sui nuovi trend...' },
      { title: 'Introduzione al Machine Learning', content: 'Scopriamo le basi del machine learning...' },
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
      { name: 'Marathon di Programmazione', date: new Date(2024, 5, 15), description: 'Unisciti alla nostra Marathoathon annuale...' },
      { name: 'Seminario su Blockchain e Criptovalute', date: new Date(2024, 6, 20), description: 'Impara tutto sulla blockchain...' },
      // Aggiungi altri eventi qui
    ];
  }

  loadFAQs(): void {
    this.faqs = [
      {
        question: 'Come posso iscrivermi ai corsi?',
        answer: 'Per iscriverti ai nostri corsi, segui questi passaggi:'
      },
      {
        question: 'Quali risorse sono disponibili per l\'apprendimento?',
        answer: ''
      },
      // Aggiungi altre FAQ qui
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

  registerForEvent(event: Event): void {
    console.log('Registrato per l\'evento:', event.name);
  }


}
