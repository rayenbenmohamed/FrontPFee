import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDesComponent } from './formation-des.component';

describe('FormationDesComponent', () => {
  let component: FormationDesComponent;
  let fixture: ComponentFixture<FormationDesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationDesComponent]
    });
    fixture = TestBed.createComponent(FormationDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
