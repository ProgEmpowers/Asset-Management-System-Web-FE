import { TestBed } from '@angular/core/testing';

import { SharedEmployeesService } from './shared-employees.service';

describe('SharedEmployeesService', () => {
  let service: SharedEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
