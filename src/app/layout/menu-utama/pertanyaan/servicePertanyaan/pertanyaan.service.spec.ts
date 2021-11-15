import { TestBed } from '@angular/core/testing';

import { PertanyaanService } from './pertanyaan.service';

describe('PertanyaanService', () => {
  let service: PertanyaanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PertanyaanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
