import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../../shared.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentViewIndex: number = 0;

  constructor(private authService: AuthService, private sharedService: SharedService) {}

  onTabChange(event: MatTabChangeEvent): void {
    this.currentViewIndex = event.index;
  }
}
