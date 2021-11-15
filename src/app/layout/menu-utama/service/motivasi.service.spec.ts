import { TestBed } from '@angular/core/testing';

import { MotivasiService } from './motivasi.service';

describe('MotivasiService', () => {
  let service: MotivasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
