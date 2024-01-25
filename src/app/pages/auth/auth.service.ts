
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iRegister } from './Models/register';
import { iAccessData } from './Models/i-access-data';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Corso, iUser } from './Models/i-user';
import { iLogin } from './Models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject = new BehaviorSubject<iAccessData | null>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  private registerUrl: string = environment.apiUrl + '/register';
  private loginUrl: string = environment.apiUrl + '/login';

  // Nuovi BehaviorSubject per le notifiche
  private preferitiUpdated = new BehaviorSubject<void>(undefined);
  private carrelloUpdated = new BehaviorSubject<void>(undefined);

  // Conteggi delle notifiche
  private notificationCounts: { preferiti: number; carrello: number } = { preferiti: 0, carrello: 0 };

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  signUp(data: iRegister): Observable<iAccessData> {
    return this.http.post<iAccessData>(this.registerUrl, data);
  }


  login(data: iLogin): Observable<iAccessData> {
    return this.http.post<iAccessData>(this.loginUrl, data).pipe(
      tap((accessData) => {
        this.authSubject.next(accessData);
        localStorage.setItem('accessData', JSON.stringify(accessData));
        this.autoLogout(accessData.accessToken);
      })
    );
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    localStorage.removeItem('preferiti');
    this.router.navigate(['/auth/login']);
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: iAccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.autoLogout(accessData.accessToken);
    this.authSubject.next(accessData);
  }

  getFavorites(): Observable<Corso[]> {
    const preferitiJson: string | null = localStorage.getItem('preferiti');
    const preferiti: Corso[] = preferitiJson ? JSON.parse(preferitiJson) : [];
    return of(preferiti);
  }

  addToFavorites(corso: Corso): Observable<void> {
    return new Observable((observer) => {
      const preferitiJson: string | null = localStorage.getItem('preferiti');
      const preferiti: Corso[] = preferitiJson ? JSON.parse(preferitiJson) : [];
      preferiti.push(corso);
      localStorage.setItem('preferiti', JSON.stringify(preferiti));

      // Aggiorna il conteggio delle notifiche e emette l'evento
      this.notificationCounts.preferiti += 1;
      this.preferitiUpdated.next();

      observer.next();
      observer.complete();
    });
  }

  removeFromFavorites(corso: Corso): Observable<void> {
    return new Observable((observer) => {
      const preferitiJson: string | null = localStorage.getItem('preferiti');
      let preferiti: Corso[] = preferitiJson ? JSON.parse(preferitiJson) : [];

      // Filtra i corsi rimuovendo quello specifico
      preferiti = preferiti.filter((c) => c.nome !== corso.nome);
      localStorage.setItem('preferiti', JSON.stringify(preferiti));

      // Aggiorna il conteggio delle notifiche e emette l'evento
      this.notificationCounts.preferiti += 1;
      this.preferitiUpdated.next();

      observer.next();
      observer.complete();
    });
  }

  getUserName(): string | null {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return null;

    const accessData: iAccessData = JSON.parse(userJson);
    return accessData.user ? accessData.user.nome : null;
  }

  // Nuovi metodi per ottenere le notifiche e iscriversi agli eventi
  getNotificationCounts(): { preferiti: number; carrello: number } {
    return { ...this.notificationCounts };
  }

  getPreferitiUpdated(): BehaviorSubject<void> {
    return this.preferitiUpdated;
  }

  getCarrelloUpdated(): BehaviorSubject<void> {
    return this.carrelloUpdated;
  }

  getCurrentUser(): iUser | null {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return null;

    const accessData: iAccessData = JSON.parse(userJson);
    return accessData.user;
  }
}
