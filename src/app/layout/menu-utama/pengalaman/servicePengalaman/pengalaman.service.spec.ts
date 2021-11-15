import { TestBed } from '@angular/core/testing';

import { PengalamanService } from './pengalaman.service';

describe('PengalamanService', () => {
  let service: PengalamanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PengalamanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
