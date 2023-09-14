import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinidosComponent } from './predefinidos.component';

describe('PredefinidosComponent', () => {
  let component: PredefinidosComponent;
  let fixture: ComponentFixture<PredefinidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredefinidosComponent]
    });
    fixture = TestBed.createComponent(PredefinidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
