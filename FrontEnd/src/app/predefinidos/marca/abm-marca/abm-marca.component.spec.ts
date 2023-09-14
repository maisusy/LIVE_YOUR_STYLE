import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMarcaComponent } from './abm-marca.component';

describe('AbmMarcaComponent', () => {
  let component: AbmMarcaComponent;
  let fixture: ComponentFixture<AbmMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmMarcaComponent]
    });
    fixture = TestBed.createComponent(AbmMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
