import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferitiComponent } from './preferiti.component';

describe('PreferitiComponent', () => {
  let component: PreferitiComponent;
  let fixture: ComponentFixture<PreferitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferitiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreferitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
