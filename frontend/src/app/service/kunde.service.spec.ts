import { TestBed } from '@angular/core/testing';

import { KundeService } from './kunde.service';

describe('KundeService', () => {
  let service: KundeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KundeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
