import { TestBed } from '@angular/core/testing';

import { HymnService } from './hymn.service';

describe('HymnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HymnService = TestBed.get(HymnService);
    expect(service).toBeTruthy();
  });
});
