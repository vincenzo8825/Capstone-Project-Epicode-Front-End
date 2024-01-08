// footer.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToTermsAndConditions(): void {
    this.router.navigate(['/terms-and-conditions']);
  }
  navigateToPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
  }
}
