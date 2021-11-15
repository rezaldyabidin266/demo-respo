import { TestBed } from '@angular/core/testing';

import { KriteriaService } from './kriteria.service';

describe('KriteriaService', () => {
  let service: KriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
