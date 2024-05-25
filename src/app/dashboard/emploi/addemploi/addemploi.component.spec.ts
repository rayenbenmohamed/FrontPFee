import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemploiComponent } from './addemploi.component';

describe('AddemploiComponent', () => {
  let component: AddemploiComponent;
  let fixture: ComponentFixture<AddemploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddemploiComponent]
    });
    fixture = TestBed.createComponent(AddemploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
