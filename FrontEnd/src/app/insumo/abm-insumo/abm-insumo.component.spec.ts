import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmInsumoComponent } from './abm-insumo.component';

describe('AbmInsumoComponent', () => {
  let component: AbmInsumoComponent;
  let fixture: ComponentFixture<AbmInsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmInsumoComponent]
    });
    fixture = TestBed.createComponent(AbmInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
