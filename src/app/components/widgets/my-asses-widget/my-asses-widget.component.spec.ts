import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssesWidgetComponent } from './my-asses-widget.component';

describe('MyAssesWidgetComponent', () => {
  let component: MyAssesWidgetComponent;
  let fixture: ComponentFixture<MyAssesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAssesWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAssesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
