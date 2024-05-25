import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeInsComponent } from './demande-ins.component';

describe('DemandeInsComponent', () => {
  let component: DemandeInsComponent;
  let fixture: ComponentFixture<DemandeInsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeInsComponent]
    });
    fixture = TestBed.createComponent(DemandeInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
