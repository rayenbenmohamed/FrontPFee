import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModuleComponent } from './add-student-module.component';

describe('AddStudentModuleComponent', () => {
  let component: AddStudentModuleComponent;
  let fixture: ComponentFixture<AddStudentModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentModuleComponent]
    });
    fixture = TestBed.createComponent(AddStudentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
