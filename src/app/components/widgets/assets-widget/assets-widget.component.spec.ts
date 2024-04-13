import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsWidgetComponent } from './assets-widget.component';

describe('AssetsWidgetComponent', () => {
  let component: AssetsWidgetComponent;
  let fixture: ComponentFixture<AssetsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetsWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
