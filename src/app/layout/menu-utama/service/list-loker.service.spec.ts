import { TestBed } from '@angular/core/testing';

import { ListLokerService } from './list-loker.service';

describe('ListLokerService', () => {
  let service: ListLokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListLokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
