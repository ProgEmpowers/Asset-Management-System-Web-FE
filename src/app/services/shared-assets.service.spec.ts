import { TestBed } from "@angular/core/testing";

import { SharedAssetsService } from "./a";

describe("SharedAssetsService", () => {
  let service: SharedAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAssetsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
