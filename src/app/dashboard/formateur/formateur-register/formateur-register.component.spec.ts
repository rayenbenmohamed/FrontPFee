import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurRegisterComponent } from './formateur-register.component';

describe('FormateurRegisterComponent', () => {
  let component: FormateurRegisterComponent;
  let fixture: ComponentFixture<FormateurRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurRegisterComponent]
    });
    fixture = TestBed.createComponent(FormateurRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
