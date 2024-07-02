import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssetEmployeeSideComponent } from './assign-asset-employee-side.component';

describe('AssignAssetEmployeeSideComponent', () => {
  let component: AssignAssetEmployeeSideComponent;
  let fixture: ComponentFixture<AssignAssetEmployeeSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignAssetEmployeeSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignAssetEmployeeSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
