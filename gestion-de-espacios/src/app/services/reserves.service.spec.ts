import { TestBed } from '@angular/core/testing';

import { ReservesService } from './reserves.service';

describe('ReserveService', () => {
  let service: ReservesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
