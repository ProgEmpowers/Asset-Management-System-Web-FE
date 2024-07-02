import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposeAssetComponent } from './dispose-asset.component';

describe('DisposeAssetComponent', () => {
  let component: DisposeAssetComponent;
  let fixture: ComponentFixture<DisposeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisposeAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
