import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckabsenceComponent } from './checkabsence.component';

describe('CheckabsenceComponent', () => {
  let component: CheckabsenceComponent;
  let fixture: ComponentFixture<CheckabsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckabsenceComponent]
    });
    fixture = TestBed.createComponent(CheckabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
