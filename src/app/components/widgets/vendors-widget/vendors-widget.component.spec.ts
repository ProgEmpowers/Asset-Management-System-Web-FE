import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsWidgetComponent } from './vendors-widget.component';

describe('VendorsWidgetComponent', () => {
  let component: VendorsWidgetComponent;
  let fixture: ComponentFixture<VendorsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
