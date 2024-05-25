import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurcourseComponent } from './formateurcourse.component';

describe('FormateurcourseComponent', () => {
  let component: FormateurcourseComponent;
  let fixture: ComponentFixture<FormateurcourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurcourseComponent]
    });
    fixture = TestBed.createComponent(FormateurcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
