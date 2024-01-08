// dashboard.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentView: 'corsi' | 'lezioni' = 'corsi';

  constructor(private authService: AuthService, private sharedService: SharedService) {}

  toggleView(view: 'corsi' | 'lezioni'): void {
    this.currentView = view;
  }
}
