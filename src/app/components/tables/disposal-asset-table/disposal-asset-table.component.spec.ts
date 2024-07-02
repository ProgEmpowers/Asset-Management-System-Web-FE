import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalAssetTableComponent } from './disposal-asset-table.component';

describe('DisposalAssetTableComponent', () => {
  let component: DisposalAssetTableComponent;
  let fixture: ComponentFixture<DisposalAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisposalAssetTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposalAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
