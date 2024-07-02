import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseAssetComponent } from './release-asset.component';

describe('ReleaseAssetComponent', () => {
  let component: ReleaseAssetComponent;
  let fixture: ComponentFixture<ReleaseAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleaseAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
