import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecknotesComponent } from './checknotes.component';

describe('ChecknotesComponent', () => {
  let component: ChecknotesComponent;
  let fixture: ComponentFixture<ChecknotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecknotesComponent]
    });
    fixture = TestBed.createComponent(ChecknotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
