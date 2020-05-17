import { TestBed } from '@angular/core/testing';

import { ValidasiService } from './validasi.service';

describe('ValidasiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidasiService = TestBed.get(ValidasiService);
    expect(service).toBeTruthy();
  });
});
