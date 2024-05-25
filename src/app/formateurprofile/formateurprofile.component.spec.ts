import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurprofileComponent } from './formateurprofile.component';

describe('FormateurprofileComponent', () => {
  let component: FormateurprofileComponent;
  let fixture: ComponentFixture<FormateurprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurprofileComponent]
    });
    fixture = TestBed.createComponent(FormateurprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
