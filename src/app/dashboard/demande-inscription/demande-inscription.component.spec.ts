import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeInscriptionComponent } from './demande-inscription.component';

describe('DemandeInscriptionComponent', () => {
  let component: DemandeInscriptionComponent;
  let fixture: ComponentFixture<DemandeInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeInscriptionComponent]
    });
    fixture = TestBed.createComponent(DemandeInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
