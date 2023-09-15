import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmColorComponent } from './abm-color.component';

describe('AbmColorComponent', () => {
  let component: AbmColorComponent;
  let fixture: ComponentFixture<AbmColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmColorComponent]
    });
    fixture = TestBed.createComponent(AbmColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
