import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurUpdateComponent } from './formateur-update.component';

describe('FormateurUpdateComponent', () => {
  let component: FormateurUpdateComponent;
  let fixture: ComponentFixture<FormateurUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurUpdateComponent]
    });
    fixture = TestBed.createComponent(FormateurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
