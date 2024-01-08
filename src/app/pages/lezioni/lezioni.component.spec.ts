import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LezioniComponent } from './lezioni.component';

describe('LezioniComponent', () => {
  let component: LezioniComponent;
  let fixture: ComponentFixture<LezioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LezioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LezioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
