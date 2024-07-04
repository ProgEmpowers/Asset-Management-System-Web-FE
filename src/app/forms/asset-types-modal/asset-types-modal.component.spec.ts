import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypesModalComponent } from './asset-types-modal.component';

describe('AssetTypesModalComponent', () => {
  let component: AssetTypesModalComponent;
  let fixture: ComponentFixture<AssetTypesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTypesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
