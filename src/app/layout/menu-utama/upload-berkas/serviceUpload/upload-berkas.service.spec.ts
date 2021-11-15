import { TestBed } from '@angular/core/testing';

import { UploadBerkasService } from './upload-berkas.service';

describe('UploadBerkasService', () => {
  let service: UploadBerkasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadBerkasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
