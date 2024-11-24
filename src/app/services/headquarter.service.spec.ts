import { TestBed } from '@angular/core/testing';

import { HeadquarterService } from './headquarter.service';

describe('HeadquarterService', () => {
  let service: HeadquarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadquarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
