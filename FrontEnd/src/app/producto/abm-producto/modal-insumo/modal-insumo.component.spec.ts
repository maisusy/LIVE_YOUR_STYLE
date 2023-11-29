import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInsumoComponent } from './modal-insumo.component';

describe('ModalInsumoComponent', () => {
  let component: ModalInsumoComponent;
  let fixture: ComponentFixture<ModalInsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInsumoComponent]
    });
    fixture = TestBed.createComponent(ModalInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
