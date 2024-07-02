import { TestBed } from '@angular/core/testing';

import { AssignAssetEmployeeSideService } from './assign-asset-employee-side.service';

describe('AssignAssetEmployeeSideService', () => {
  let service: AssignAssetEmployeeSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignAssetEmployeeSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
