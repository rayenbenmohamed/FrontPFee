import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploidetailsComponent } from './emploidetails.component';

describe('EmploidetailsComponent', () => {
  let component: EmploidetailsComponent;
  let fixture: ComponentFixture<EmploidetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploidetailsComponent]
    });
    fixture = TestBed.createComponent(EmploidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
