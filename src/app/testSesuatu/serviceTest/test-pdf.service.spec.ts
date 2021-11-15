import { TestBed } from '@angular/core/testing';

import { TestPdfService } from './test-pdf.service';

describe('TestPdfService', () => {
  let service: TestPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
