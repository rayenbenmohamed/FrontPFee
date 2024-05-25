import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencenotesComponent } from './absencenotes.component';

describe('AbsencenotesComponent', () => {
  let component: AbsencenotesComponent;
  let fixture: ComponentFixture<AbsencenotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsencenotesComponent]
    });
    fixture = TestBed.createComponent(AbsencenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
