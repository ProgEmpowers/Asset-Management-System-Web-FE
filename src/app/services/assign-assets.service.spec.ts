import { TestBed } from '@angular/core/testing';

import { AssignAssetsService } from './assign-assets.service';

describe('AssignAssetsService', () => {
  let service: AssignAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
