import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavoraConNoiComponent } from './lavora-con-noi.component';

describe('LavoraConNoiComponent', () => {
  let component: LavoraConNoiComponent;
  let fixture: ComponentFixture<LavoraConNoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LavoraConNoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LavoraConNoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
