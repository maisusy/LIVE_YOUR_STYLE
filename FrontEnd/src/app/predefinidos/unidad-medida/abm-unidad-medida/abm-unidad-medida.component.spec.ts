import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmUnidadMedidaComponent } from './abm-unidad-medida.component';

describe('AbmUnidadMedidaComponent', () => {
  let component: AbmUnidadMedidaComponent;
  let fixture: ComponentFixture<AbmUnidadMedidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmUnidadMedidaComponent]
    });
    fixture = TestBed.createComponent(AbmUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
