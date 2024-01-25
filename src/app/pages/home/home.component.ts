
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('1s ease-in-out')]),
    ]),
    trigger('fadeInUp', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [style({ opacity: 0, transform: 'translateY(20px)' }), animate('1s ease-in-out')]),
    ]),
  ],
})
export class HomeComponent {}
