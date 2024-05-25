import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDetailsModalComponent } from './emploi-details-modal.component';

describe('EmploiDetailsModalComponent', () => {
  let component: EmploiDetailsModalComponent;
  let fixture: ComponentFixture<EmploiDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploiDetailsModalComponent]
    });
    fixture = TestBed.createComponent(EmploiDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
