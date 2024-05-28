import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsellingAssetComponent } from './newselling-asset.component';

describe('NewsellingAssetComponent', () => {
  let component: NewsellingAssetComponent;
  let fixture: ComponentFixture<NewsellingAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsellingAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsellingAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
