import { TestBed } from '@angular/core/testing';

import { InsertBarcodeService } from './insert-barcode.service';

describe('InsertBarcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertBarcodeService = TestBed.get(InsertBarcodeService);
    expect(service).toBeTruthy();
  });
});
