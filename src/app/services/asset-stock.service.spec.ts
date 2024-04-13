import { TestBed } from '@angular/core/testing';

import { AssetStockService } from './asset-stock.service';

describe('AssetStockService', () => {
  let service: AssetStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
