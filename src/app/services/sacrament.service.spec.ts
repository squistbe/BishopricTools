import { TestBed } from '@angular/core/testing';

import { SacramentService } from './sacrament.service';

describe('SacramentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SacramentService = TestBed.get(SacramentService);
    expect(service).toBeTruthy();
  });
});
