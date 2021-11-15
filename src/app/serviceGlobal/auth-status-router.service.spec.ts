import { TestBed } from '@angular/core/testing';

import { AuthStatusRouterService } from './auth-status-router.service';

describe('AuthStatusRouterService', () => {
  let service: AuthStatusRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStatusRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
