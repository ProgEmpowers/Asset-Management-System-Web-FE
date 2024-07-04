import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetTableComponent } from './employee-asset-table.component';

describe('EmployeeAssetTableComponent', () => {
  let component: EmployeeAssetTableComponent;
  let fixture: ComponentFixture<EmployeeAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeAssetTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
