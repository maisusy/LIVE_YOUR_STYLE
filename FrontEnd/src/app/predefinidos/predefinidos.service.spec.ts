import { TestBed } from '@angular/core/testing';

import { PredefinidosService } from './predefinidos.service';

describe('PredefinidosService', () => {
  let service: PredefinidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
