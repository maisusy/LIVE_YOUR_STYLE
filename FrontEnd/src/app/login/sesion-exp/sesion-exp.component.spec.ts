import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionExpComponent } from './sesion-exp.component';

describe('SesionExpComponent', () => {
  let component: SesionExpComponent;
  let fixture: ComponentFixture<SesionExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesionExpComponent]
    });
    fixture = TestBed.createComponent(SesionExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
