import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantModuleComponent } from './etudiant-module.component';

describe('EtudiantModuleComponent', () => {
  let component: EtudiantModuleComponent;
  let fixture: ComponentFixture<EtudiantModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtudiantModuleComponent]
    });
    fixture = TestBed.createComponent(EtudiantModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
