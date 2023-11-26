import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProveedorComponent } from './abm-proveedor.component';

describe('AbmProveedorComponent', () => {
  let component: AbmProveedorComponent;
  let fixture: ComponentFixture<AbmProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmProveedorComponent]
    });
    fixture = TestBed.createComponent(AbmProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
