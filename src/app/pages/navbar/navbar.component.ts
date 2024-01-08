// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/chi-siamo', label: 'Chi Siamo', icon: 'info' },
    { path: '/preferiti', label: 'Preferiti', icon: 'favorite' },
    { path: '/carrello', label: 'Carrello', icon: 'shopping_cart' },
  ];

  isLoggedIn$: Observable<boolean>;
  userName: string | null;
  preferitiCount: number = 0;
  carrelloCount: number = 0;
  isNavListOpen: boolean = false;
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.userName = null;

    if (this.isLoggedIn$) {
      this.userName = this.authService.getUserName();
    }
  }

  ngOnInit() {
    this.sharedService.getPreferitiUpdated().subscribe(() => {
      this.updatePreferitiCount();
    });

    this.sharedService.getCarrelloUpdated().subscribe(() => {
      this.updateCarrelloCount();
    });
  }

  private updatePreferitiCount() {
    const preferiti = this.sharedService.getPreferitiLezioni();
    this.preferitiCount = preferiti.length;
  }

  private updateCarrelloCount() {
    const carrello = this.sharedService.getCarrelloLezioni();
    this.carrelloCount = carrello.length;
  }

  getNotificationCount(count: number): string {
    return count > 99 ? '99+' : count.toString();
  }

  onLogout() {
    this.authService.logout();
  }

  // Nuovo metodo per ottenere il conteggio delle notifiche dei preferiti
  getPreferitiNotificationCount(): string {
    const count = this.authService.getNotificationCounts().preferiti;
    return this.getNotificationCount(count);
  }

  // Nuovo metodo per ottenere il conteggio delle notifiche del carrello
  getCarrelloNotificationCount(): string {
    const count = this.authService.getNotificationCounts().carrello;
    return this.getNotificationCount(count);
  }
  toggleNavList() {
    this.isNavListOpen = !this.isNavListOpen;
  }
  closeNavList() {
    this.isNavListOpen = false;
  }
}
