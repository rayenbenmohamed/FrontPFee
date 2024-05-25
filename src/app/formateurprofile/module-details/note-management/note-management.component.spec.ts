import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteManagementComponent } from './note-management.component';

describe('NoteManagementComponent', () => {
  let component: NoteManagementComponent;
  let fixture: ComponentFixture<NoteManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteManagementComponent]
    });
    fixture = TestBed.createComponent(NoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
